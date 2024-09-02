
export default(sequelize, Sequelize) => {
    const Purchase = sequelize.define("Purchase", {
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
        user_uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,          
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
    return Purchase;
}