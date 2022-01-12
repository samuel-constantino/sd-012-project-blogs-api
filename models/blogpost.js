const BlogPost = (sequelize, DataType) => {
  const BlogPostModel = sequelize.define('BlogPost',
    {
      title: DataType.STRING,
      content: DataType.STRING,
      userId: { type: DataType.INTEGER, foreignKey: true },
      published: DataType.DATE,
      updated: DataType.DATE,
    },
    {
      timestamps: false,
      tableName: 'BlogPosts',
    });

  BlogPostModel.associate = (models) => {
    BlogPostModel.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPostModel;
};

module.exports = BlogPost;
