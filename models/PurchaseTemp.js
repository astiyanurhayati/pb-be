
export default (sequelize, Sequelize) => {
    const PurchaseTemp = sequelize.define("PurchaseTemp", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        design_uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        shipping: {
            type: Sequelize.ENUM(["JNE", "AnterAja"]),
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "Pending",
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        postal_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        amount: {
            type: Sequelize.INTEGER,
            defaultValue:0,
            allowNull: false,
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        order_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    })
    return PurchaseTemp;
}