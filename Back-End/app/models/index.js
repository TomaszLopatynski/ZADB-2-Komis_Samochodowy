const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define: {
        timestamps: false
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cars = require("./cars.model.js")(sequelize, Sequelize);
db.customer = require("./customers.model.js")(sequelize, Sequelize);
db.department = require("./departments.model.js")(sequelize, Sequelize);
db.employees = require("./employees.model.js")(sequelize, Sequelize);

module.exports = db;