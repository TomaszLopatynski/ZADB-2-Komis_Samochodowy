const db = require("../models");
const Employees = db.employees;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.LName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const employees = {
        FName: req.body.FName,
        LName: req.body.LName,
        Email: req.body.Email,
        PhoneNumber: req.body.PhoneNumber,
        PreferredContact: req.body.PreferredContact
    };

    Employees.create(employees)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employee."
            });
        });
};

exports.findAll = (req, res) => {
    const LName = req.query.LName;
    var condition = LName ? { LName: { [Op.like]: `%${LName}%` } } : null;

    Employees.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Employees."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Employees.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Employee with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Employees.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Employee was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Employees.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Employees.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Employees were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Employees."
            });
        });
};