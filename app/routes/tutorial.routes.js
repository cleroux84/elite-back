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

    var router = require("express").Router();

    router.post("/", articles.create);

    router.get("/",  articles.findAll);

    router.get("/:id", articles.findOne);

    router.put("/:id", checkJwt, articles.update);

    router.delete("/:id", checkJwt, articles.delete);

    router.delete("/", checkJwt, articles.deleteAll);

    app.get('/file/:name', function (req, res, next) {
        const options = {
            root: path.join(__dirname, '../../uploads/')
        };
        const fileName = req.params.name;
        res.sendFile(fileName, options, function (err) {
            if (err) {next (err)} else {console.log('Sent:', fileName)}
        })
    })

    app.post('/upload', upload.single("file"), (req, res) => {
        const { filename: file} = req.file
        res.redirect("/")
    })

    app.use('/api/articles', router);
}