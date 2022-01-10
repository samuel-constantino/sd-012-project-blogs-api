const jwt = require('jsonwebtoken');

const { User } = require('../models');

const {
    USER_ALREADY_REGISTERED,
    DISPLAYNAME_INCORRECT_LENGTH,
    EMAIL_IS_REQUIRED,
    EMAIL_NOT_VALID,
    EMAIL_EMPTY,
    PASSWORD_IS_REQUIRED,
    PASSWORD_INCORRECT_LENGTH,
    PASSWORD_EMPTY,
    INVALID_FIELDS,
} = require('../util/erros');

const displayNameValid = (displayName) => {
    if (displayName.length < 8) return DISPLAYNAME_INCORRECT_LENGTH;

    return {};
};

const emailValid = (email) => {
    const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email === '') return EMAIL_EMPTY;

    if (!email) return EMAIL_IS_REQUIRED;

    if (!reg.test(email)) return EMAIL_NOT_VALID;

    return {};
};

const passwordValid = (password) => {
    if (password === '') return PASSWORD_EMPTY;

    if (!password) return PASSWORD_IS_REQUIRED;
    
    if (password.length < 6) return PASSWORD_INCORRECT_LENGTH;

    return {};
};

const getToken = (user) => {
    const SECRET = process.env.JWT_SECRET;

    const OPTIONS = {
    expiresIn: '1d',
    algorithm: 'HS256',
    };

    const { password, image, ...payload } = user;

    const token = jwt.sign({ data: payload }, SECRET, OPTIONS);

    return token;
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
    create,
    login,
};