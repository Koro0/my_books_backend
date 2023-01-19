import { Sequelize, DataTypes , Model} from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize('user', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

class User extends Model { }

User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
}, { sequelize, modelName: 'User' });

sequelize.sync();

export default User;
