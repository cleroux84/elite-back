module.exports = app => {
    const articles = require("../controllers/tutorial.controller");

    var router = require("express").Router();

    router.post("/", articles.create);

    router.get("/", articles.findAll);

    router.get("/:id", articles.findOne);

    router.put("/:id", articles.update);

    router.delete("/:id", articles.delete);

    router.delete("/", articles.deleteAll)

    app.use('/api/articles', router);
}