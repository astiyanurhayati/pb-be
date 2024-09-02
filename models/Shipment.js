

export default(sequelize, Sequelize) => {
    const Shipment = sequelize.define("Shipment", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
        purchase_uuid: {
            type: Sequelize.UUID,
            allowNull: false,          
        },
        user_uuid: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    })
    return Shipment;
}