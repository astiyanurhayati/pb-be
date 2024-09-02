import Sequelize from "sequelize";

import User from "./User.js";
import Purchase from "./Purchase.js";
import config from "../config/db.js";

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
db.Purchase = User(sequelize, Sequelize);
db.Shipment = User(sequelize, Sequelize);


export default db;
