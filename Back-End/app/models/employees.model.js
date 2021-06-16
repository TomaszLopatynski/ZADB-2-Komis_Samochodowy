module.exports = (sequelize, Sequelize) => {
    const Employees = sequelize.define("employees", {
        FName: {
            type: Sequelize.STRING
        },
        LName: {
            type: Sequelize.STRING
        },
        PhoneNumber: {
            type: Sequelize.INTEGER
        },
        ManagerId: {
            type: Sequelize.INTEGER
        },
        DepartmentId: {
            type: Sequelize.INTEGER
        },
        Salary: {
            type: Sequelize.INTEGER
        },
        HireDate: {
            type: Sequelize.DATE
        },
    });
    return Employees;
};