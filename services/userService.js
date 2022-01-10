const { User } = require('../models');

const {
    displayNameValid,
    emailValid,
    passwordValid,
} = require('../util/validations');

const {
    USER_ALREADY_REGISTERED,
    INVALID_FIELDS,
} = require('../util/erros');

const { getToken } = require('../util/authentication');

const findAll = async () => {
    const result = await User.findAll({
            attributes: { exclude: ['password'] },
        });

    return result;
};

const create = async (user) => {
    const { displayName, email, password } = user;

    const displayNameValided = displayNameValid(displayName);
    if (displayNameValided.message) return displayNameValided;

    const emailValided = emailValid(email);
    if (emailValided.message) return emailValided;

    const passwordValided = passwordValid(password);
    if (passwordValided.message) return passwordValided;

    const userFound = await User.findOne({ where: { email } });
    if (userFound) return USER_ALREADY_REGISTERED;

    const result = await User.create(user);

    const token = getToken(result);

    return { token };
};

const login = async (user) => {
    const { email, password } = user;

    const emailValided = emailValid(email);
    if (emailValided.message) return emailValided;

    const passwordValided = passwordValid(password);
    if (passwordValided.message) return passwordValided;

    const result = await User.findOne({ where: { email, password } });
    if (!result) return INVALID_FIELDS;

    const token = getToken(user);

    return { token };
};

module.exports = {
    findAll,
    create,
    login,
};