import { Sequelize, DataTypes , Model} from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize('user', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

class User extends Model { }

User.init({

  pseudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'User' });

sequelize.sync();

export default User;
