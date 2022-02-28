const path = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const Process = require("process");

//auth0 API
const authConfig = {
    domain: Process.env.AUTH_DOMAIN,
    audience: Process.env.AUTH_AUDIENCE
};
const articles = require("../controllers/tutorial.controller");
const admin = require('../controllers/admin.controller');
const appointment = require('../controllers/appointment.controller');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

module.exports = app => {

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
}

//Upload cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINADRY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'dev_setups',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.originalname,
    },
});
const parser = multer({storage: storage})

app.post('/api/upload', parser.single('file'), function (req, res) {
    res.json(req.file)
    console.log(req.file)
})