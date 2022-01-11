const { Category } = require('../models');

const {
    nameValid,
} = require('../util/validations');

// const findOne = async (id) => {
//     const result = await User.findOne({
//         where: { id },
//         attributes: { exclude: ['password'] },
//     });

//     if (!result) return USER_NOT_FOUND;

//     return result;
// };

const findAll = async () => {
    const result = await Category.findAll();

    return result;
};

const create = async (user) => {
    const { name } = user;

    const nameValided = nameValid(name);
    if (nameValided.status) return nameValided;

    const result = await Category.create(user);

    return result;
};

module.exports = {
    findAll,
    // findOne,
    create,
};