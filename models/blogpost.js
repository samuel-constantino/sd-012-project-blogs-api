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
      underscored: true,
    });

  BlogPostModel.associate = (models) => {
    BlogPostModel.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
  };

  return BlogPostModel;
};

module.exports = BlogPost;
