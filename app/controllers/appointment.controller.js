const Appointments = require("../models").appointments;

exports.findAll = (req, res) => {

    Appointments.findAll()
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