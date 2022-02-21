const Appointments = require("../models").appointments;

exports.create = (req, res) => {
    if (!req.body.firstname) {
        res.status(400).send({
            message: "firstname can not be empty!"
        });
    }
    const event = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        start: new Date(req.body.start),
        end: new Date(req.body.end),
        comment: req.body.comment,
        createdAt: Date.now(),
        status: req.body.status
    }

    Appointments.create(event)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the event."
            });
        });
}

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

exports.update = (req, res) => {
    const id = req.params.id;
    Appointments.update(req.body, {
        where: {id: id}
    })
        .then(num => {
                res.send({
                    message : "Event was updated successfully."
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Event with Id=" + id
            });
        });
}
