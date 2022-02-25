const path = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
//auth0 API
const authConfig = {
    domain: "dev-nrug8pbx.us.auth0.com",
    audience: "https://elite-coaching-api.com"
};

module.exports = app => {
    const articles = require("../controllers/tutorial.controller");
    const admin = require('../controllers/admin.controller');
    const appointment = require('../controllers/appointment.controller');
    const multer = require("multer");

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }
    });

    const checkJwt = jwt({
        // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
        }),

        // Validate the audience (Identifier) and the issuer (Domain).
        audience: authConfig.audience,
        issuer: `https://${authConfig.domain}/`,
        algorithms: ["RS256"]
    });
    let upload = multer({ storage: storage})

    // var router = require("express").Router();
//CRUD Articles
    app.post("/api/articles", articles.create);
    app.get("/api/articles",  articles.findAll);
    app.get("/api/articles/:id", articles.findOne);
    app.put("/api/articles/:id", checkJwt, articles.update);
    app.delete("/api/articles/:id", checkJwt, articles.delete);
    app.delete("/api/articles/", checkJwt, articles.deleteAll);
//envoi des admin
    app.get('/api/admin', checkJwt, admin.findAll);

//CRUD appointments
    app.post("/api/appointment", appointment.create)
    app.get("/api/appointment", appointment.findAll);
    app.get("/api/appointment/:id", checkJwt, appointment.findOne);
    app.delete("/api/appointment/:id", checkJwt, appointment.delete);
    app.put("/api/appointment/:id",checkJwt, appointment.update);

    //TODO a refacto
    const cloudinary = require('cloudinary').v2
    require('dotenv').config();
    cloudinary.config({
        cloud_name: process.env.CLOUDINADRY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    app.post("/upload", upload.single('file'), async (req, res) => {
        try{
            const result = await cloudinary.uploader.upload(req.file.path).then(response => {
                res.send({
                    message: response.secure_url
                })
            })
        } catch (err) {
            console.log(err)
        }
    })

    /*app.post('/upload', upload.single("file"), (req, res) => {
        console.log(req.file)
        const { filename: file} = req.file
        res.redirect("/")
    })*/

    // app.use('/api/articles', router);
}