import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import sequelize from '../database/database.mjs';

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING(25),
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z\s]*$/,
        msg: 'First name can only contain letters and spaces',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING(25),
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z\s]*$/,
        msg: 'Last name can only contain letters and spaces',
      },
    },
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      msg: 'Email address already in use',
    },
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 100],
        msg: 'Password must be between 8 and 100 characters long',
      },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/,
        msg: 'Password must have at least one uppercase letter, one lowercase letter, one number and one special character',
      },
    },
    set(value) {
      const hash = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
      this.setDataValue('password', hash);
    },
  },
  status: {
    type: DataTypes.ENUM,
    values: ['active', 'suspended', 'deleted'],
    defaultValue: 'active',
    allowNull: false,
  },
});

export default User;
