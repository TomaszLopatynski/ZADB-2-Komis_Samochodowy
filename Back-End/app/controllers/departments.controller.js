const db = require("../models");
const Departments = db.department;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const Name = req.query.Name;
    var condition = Name ? { Name: { [Op.like]: `%${Name}%` } } : null;

    Departments.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving departments."
            });
        });
};