const User = (sequelize, DataType) => {
  const UserModel = sequelize.define(
    'User',
    {
      displayName: DataType.STRING,
      email: DataType.STRING,
      password: DataType.STRING,
      image: DataType.STRING,
    },
    {
      timestamps: false,
      tableName: 'Users',
      underscored: true,
    },
  );

  return UserModel;
};

module.exports = User;
