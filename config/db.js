import "dotenv/config";

export default {
  username: process.env.DB_USERNAME,
  password: null,
  database: process.env.DB_NAME,
  dialect: "mysql",
  host: process.env.DB_HOST,
};
