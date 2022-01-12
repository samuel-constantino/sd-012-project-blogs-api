const { StatusCodes } = require('http-status-codes');
// const Sequelize = require('sequelize');
const { transaction } = require('sequelize');
// const { development } = require('../config/config');

const { BlogPost, Category, User } = require('../models');

const userService = require('./userService');
const postCategoryService = require('./postCategoryService');
const categoryService = require('./categoryService');

const { categoryValid } = require('../util/validations');

// const sequelize = new Sequelize(development);

const findAll = async () => (BlogPost.findAll({
    include: [{ model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  }));

const create = async (post) => {
    // const transaction = await sequelize.transaction();
    
    try {
        const { title, content, categoryIds, userEmail } = post;

        const { id: userId } = await userService.findOneByEmail(userEmail);

        const categories = await categoryService.findAllByIds(categoryIds);

        const categoriesIdsValid = categoryValid(categories, categoryIds);

        if (categoriesIdsValid.status) return categoriesIdsValid;
        
        const createdPost = await BlogPost.create(
            { title, content, userId, published: new Date(), updated: new Date() },
            // { transaction },
        );

        const { id: postId } = createdPost;

        categoryIds.forEach(async (categoryId) => {
            await postCategoryService.create({ postId, categoryId }, { transaction });
        });

        // transaction.commit();
        return createdPost;
    } catch (e) {
        // await transaction.rollback();
        console.log(e.message);
        return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Algo deu errado!' };
    }
};

module.exports = {
    create,
    findAll,
};