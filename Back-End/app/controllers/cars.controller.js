const db = require("../models");
const Cars = db.cars;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.Model) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const cars = {
        CustomerId: req.body.CustomerId,
        EmployeeId: req.body.CustomerId,
        Model: req.body.Model,
        Status: req.body.Status,
        TotalCost: req.body.TotalCost
    };

    Cars.create(cars)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Car."
            });
        });
};

exports.findAll = (req, res) => {
    const Model = req.query.Model;
    var condition = Model ? { Model: { [Op.like]: `%${Model}%` } } : null;

    Cars.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cars."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Cars.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Car with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Cars.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Car was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Car with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Cars.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Car was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Car with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Cars.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Cars were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all cars."
            });
        });
};