const Admin = require("../models").admins

exports.findAll = (req, res) => {

    Admin.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "error with admin list"
            })
        })
};