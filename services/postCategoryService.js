const { PostsCategory } = require('../models');

const create = async (postCategoryIds) => {
    const { postId, categoryId } = postCategoryIds;
    
    const createdPostCategory = await PostsCategory.create({
        postId,
        categoryId,
    });

    return createdPostCategory;
};

module.exports = {
    create,
};