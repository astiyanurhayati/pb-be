
export default (sequelize, Sequelize) => {
    const Address = sequelize.define("Address", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user_uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        province: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postal_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Address;
}