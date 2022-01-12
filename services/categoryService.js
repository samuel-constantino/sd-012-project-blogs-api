const { Op } = require('sequelize');
const { Category } = require('../models');

const {
    nameValid,
} = require('../util/validations');

const findAll = async () => {
    const result = await Category.findAll();

    return result;
};

const findAllByIds = async (ids) => {
    const result = await Category.findAll({
        where: {
            id: { [Op.in]: ids },
        },
    });

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
    findAllByIds,
    create,
};