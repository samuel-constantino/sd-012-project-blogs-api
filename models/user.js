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

  UserModel.associate = (models) => {
    UserModel.hasMany(models.BlogPost, { as: 'posts', foreignKey: 'user_id' });
  };

  return UserModel;
};

module.exports = User;
