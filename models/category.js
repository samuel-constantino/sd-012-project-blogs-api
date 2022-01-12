const Category = (sequelize, DataType) => {
  const CategoryModel = sequelize.define(
    'Category',
    {
      name: DataType.STRING,
    },
    {
      timestamps: false,
      tableName: 'Categories',
    },
  );

  return CategoryModel;
};

module.exports = Category;
