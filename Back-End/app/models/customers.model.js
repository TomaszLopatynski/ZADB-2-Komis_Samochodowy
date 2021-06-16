module.exports = (sequelize, Sequelize) => {
    const Customers = sequelize.define("customers", {
        FName: {
            type: Sequelize.STRING
        },
        LName: {
            type: Sequelize.STRING
        },
        Email: {
            type: Sequelize.STRING
        },
        PhoneNumber: {
            type: Sequelize.INTEGER
        },
        PreferredContact: {
            type: Sequelize.STRING
        },
    });
    return Customers;
};