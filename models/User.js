export default (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM(["admin", "user"]),
      allowNull: false,
      defaultValue: "user",
    },
  });
  return User;
};
