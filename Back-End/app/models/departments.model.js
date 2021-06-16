module.exports = (sequelize, Sequelize) => {
    const Departments = sequelize.define("departments", {
        Name: {
            type: Sequelize.STRING
        },
    });
    return Departments;
};