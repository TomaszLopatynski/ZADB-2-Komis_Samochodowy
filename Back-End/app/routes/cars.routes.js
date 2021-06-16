module.exports = app => {
    const cars = require("../controllers/cars.controller.js");

    var router = require("express").Router();

    // /api/cars: POST, GET, DELETE
    router.post("/", cars.create);
    router.get("/", cars.findAll);
    router.delete("/", cars.deleteAll);

    // /api/cars/:id: GET, PUT, DELETE
    router.get("/:id", cars.findOne);
    router.put("/:id", cars.update);
    router.delete("/:id", cars.delete);



    app.use('/api/cars', router);
};