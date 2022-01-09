'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => (
    queryInterface.createTable(
      'PostsCategories',
      {
        postId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'BlogPosts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          primaryKey: true,
          field: 'post_id',
        },
        categoryId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Categories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          primaryKey: true,
          field: 'category_id',
        }
      },
    )
  ),

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('PostsCategories'),
};
