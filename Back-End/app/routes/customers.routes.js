module.exports = app => {
    const customers = require("../controllers/customers.controller.js");

    var router = require("express").Router();

    // /api/cars: POST, GET, DELETE
    router.post("/", customers.create);
    router.get("/", customers.findAll);
    router.delete("/", customers.deleteAll);

    // /api/cars/:id: GET, PUT, DELETE
    router.get("/:id", customers.findOne);
    router.put("/:id", customers.update);
    router.delete("/:id", customers.delete);



    app.use('/api/customers', router);
};