import Sequelize from "sequelize";


import User from "./User.js";
import Purchase from "./Purchase.js";
import config from "../config/db.js";
import Address from "./Address.js";
import Shipment from "./Shipment.js";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize);
db.Purchase = Purchase(sequelize, Sequelize);
db.Shipment = Shipment(sequelize, Sequelize);

db.Address = Address(sequelize, Sequelize);

db.Address.belongsTo(db.User, { as: "user", foreignKey: "user_uuid", });
db.Purchase.belongsTo(db.User, { as: "user", foreignKey: "user_uuid", });

db.User.hasMany(db.Purchase, { as: "purchases", foreignKey: "user_uuid", });
db.User.hasMany(db.Address, { as: "addresses", foreignKey: "user_uuid", });


export default db;
