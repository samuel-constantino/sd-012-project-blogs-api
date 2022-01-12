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
    },
  );

  UserModel.associate = (models) => {
    UserModel.hasMany(models.BlogPost, { as: 'posts', foreignKey: 'userId' });
  };

  return UserModel;
};

module.exports = User;
