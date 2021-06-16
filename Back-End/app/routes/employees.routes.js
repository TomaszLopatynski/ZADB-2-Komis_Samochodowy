module.exports = app => {
    const employees = require("../controllers/employees.controller.js");

    var router = require("express").Router();

    // /api/cars: POST, GET, DELETE
    router.post("/", employees.create);
    router.get("/", employees.findAll);
    router.delete("/", employees.deleteAll);

    // /api/cars/:id: GET, PUT, DELETE
    router.get("/:id", employees.findOne);
    router.put("/:id", employees.update);
    router.delete("/:id", employees.delete);



    app.use('/api/employees', router);
};