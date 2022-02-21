const Articles = require("../models").articles;

// Create and Save a new Article
exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: "content can not be empty!"
        });
    }
    const article = {
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt,
        image: req.body.image
    };
    Articles.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured while creating the article."
            });
        });
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
    //search function
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}`}} : null;

    Articles.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured while retrieving articles"
            });
        });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Articles.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with id=" + id
            });
        });
};
// Update an Article by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Articles.update(req.body, {
        where: {id: id}
    })
        .then(num => {
                res.send({
                    message : "Article was updated successfully."
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Article with Id=" + id
            });
        });
};
// Delete an Article with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Articles.destroy({
        where: { id: id}
    })
        .then(num => {
            if(num === 1) {
                res.send({
                    message : "Article was deleted successfully !"
                });
            } else {
                res.send({
                    message: `Cannot delete Article with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Article with id=" +id
            });
        });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Articles.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} articles were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all articles."
            });
        });
};
