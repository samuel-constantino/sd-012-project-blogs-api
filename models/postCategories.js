const postCategories = (sequelize, _DataTypes) => {
    const postCategoriesModel = sequelize.define('PostCategory',
        {},
        { timestamps: false });
    postCategoriesModel.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
                as: 'categories',
                through: postCategoriesModel,
                foreignKey: 'post_id',
                otherKey: 'category_id',
            });
        models.Category.belongsToMany(models.BlogPost, {
                as: 'posts',
                through: postCategoriesModel,
                foreignKey: 'category_id',
                otherKey: 'post_id',
            });
    };
    return postCategoriesModel;
};

module.exports = postCategories;
