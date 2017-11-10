module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      // validates that username is not repeated.
      unique: {
        args: true,
        msg: 'Username already used. Please try another username'
      },
      validate: {
        len: {
          args: [4, 20],
          msg: 'Username must be btw 4 - 20 characters'
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already used. please try another email'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'The email is not valid. Please input a valid email.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
    });

    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
    });

    User.hasMany(models.Review, {
      foreignKey: 'userId',
    });
  };
  return User;
};
