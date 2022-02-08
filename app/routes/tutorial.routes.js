module.exports = app => {
    const articles = require("../controllers/tutorial.controller");
    const multer = require("multer");

    const upload = multer({
        dest: "./uploads/"
    })

    var router = require("express").Router();

    router.post("/", articles.create);

    router.get("/", articles.findAll);

    router.get("/:id", articles.findOne);

    router.put("/:id", articles.update);

    router.delete("/:id", articles.delete);

    router.delete("/", articles.deleteAll);

    app.post('/upload', upload.single("file"), (req, res) => {
        res.json({ file: req.file})
    })

    app.use('/api/articles', router);
}