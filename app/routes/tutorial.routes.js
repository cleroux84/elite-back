const path = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
//auth0 API
const authConfig = {
    domain: "dev-nrug8pbx.us.auth0.com",
    audience: "https://elite-coaching-api.com"
};
const articles = require("../controllers/tutorial.controller");
const admin = require('../controllers/admin.controller');
const appointment = require('../controllers/appointment.controller');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

module.exports = app => {
    cloudinary.config({
        cloud_name: "hghzq1rcq",
        api_key: "393961743377671",
        api_secret: "hjTBFcQqfCu1m0O6pYiS1V0_Xq8",
    });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'dev_setups',
            format: async (req, file) => 'png', // supports promises as well
            public_id: (req, file) => file.originalname,
        },
    });
    const parser = multer({storage: storage})

    app.post('/api/upload', parser.single('file'), function (req, res) {
        res.json(req.file)
        console.log(req.file)
    })

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

    // app.use('/api/articles', router);
}