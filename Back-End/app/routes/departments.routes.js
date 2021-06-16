module.exports = app => {
    const departments = require("../controllers/departments.controller.js");

    var router = require("express").Router();

    // /api/cars: GET
    router.get("/", departments.findAll);

    app.use('/api/departments', router);
};