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
    let upload = multer({ storage: storage})

    var router = require("express").Router();

    router.post("/", articles.create);

    router.get("/", articles.findAll);

    router.get("/:id", articles.findOne);

    router.put("/:id", articles.update);

    router.delete("/:id", articles.delete);

    router.delete("/", articles.deleteAll);

    app.post('/upload', upload.single("file"), (req, res) => {
        // res.json({ file: req.file})
        const { filename: file} = req.file
        res.redirect("/")
    })

    app.use('/api/articles', router);
}