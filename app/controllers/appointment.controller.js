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

exports.findOne = (req, res) => {
    const id = req.params.id;

    Appointments.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error with this event"
            });
        });
};

exports.create = (req, res) => {
    // if(!req.body.title) {
    //     res.status(400).send({
    //         message: "content can not be empty!"
    //     });
    // }
    const appointment = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        start: req.body.start,
        end: req.body.end,
        comment: req.body.comment,
        createdAt: req.body.createdAt
    };

    Appointments.create(appointment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the event."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Appointments.destroy({
        where: { id: id}
    })
        .then(num => {
            if(num === 1) {
                res.send({
                    message : "Event was deleted successfully !"
                });
            } else {
                res.send({
                    message: `Cannot delete Event with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Event with id=" +id
            });
        });
}
