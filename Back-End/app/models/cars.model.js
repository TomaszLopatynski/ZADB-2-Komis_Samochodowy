module.exports = (sequelize, Sequelize) => {
    const Cars = sequelize.define("cars", {
        CustomerId: {
            type: Sequelize.INTEGER
        },
        EmployeeId: {
            type: Sequelize.INTEGER
        },
        Model: {
            type: Sequelize.STRING
        },
        Status: {
            type: Sequelize.BOOLEAN
        },
        TotalCost: {
            type: Sequelize.INTEGER
        },
    });
    return Cars;
};