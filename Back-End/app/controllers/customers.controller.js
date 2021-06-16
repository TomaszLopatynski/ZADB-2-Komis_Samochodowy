const db = require("../models");
const Customers = db.customer;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.LName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const customers = {
        FName: req.body.FName,
        LName: req.body.LName,
        Email: req.body.Email,
        PhoneNumber: req.body.PhoneNumber,
        PreferredContact: req.body.PreferredContact
    };

    Customers.create(customers)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        });
};

exports.findAll = (req, res) => {
    const LName = req.query.LName;
    var condition = LName ? { LName: { [Op.like]: `%${LName}%` } } : null;

    Customers.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Customers.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Customers.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Customer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Customers.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Customers.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Customers were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        });
};