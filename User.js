const Sequelize = require("sequelize");

const sequelize = new Sequelize("sys", "sreenu", "password", {
  dialect: "mysql",
  port: "3306",
  host: "127.0.0.1"
});

class Users extends Sequelize.Model {}
Users.init(
  {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: Sequelize.STRING
  },
  { sequelize, modelName: "Users", timestamps: false }
);

const createUser = ({ username, password }) => {
  Users.build({
    username,
    password
  })
    .save()
    .then(() => {
      console.log("Data saved");
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports = createUser;
