const { User } = require('../models');

const displayNameValid = (displayName) => {
    if (displayName.length < 8) {
        return { status: 400, error: '"displayName" length must be at least 8 characters long' };
    }

    return {};
};

const emailValid = (email) => {
    const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email) return { status: 400, error: '"email" is required' };

    if (!reg.test(email)) {
        return { status: 400, error: '"email" must be a valid email' };
    }

    return {};
};

const passwordValid = (password) => {
    if (!password) return { status: 400, error: '"password" is required' };
    console.log(password.length);
    if (password.length < 6) {
        return { status: 400, error: '"password" length must be 6 characters long' };
    }

    return {};
};

const create = async (user) => {
    const { displayName, email, password } = user;

    const displayNameValided = displayNameValid(displayName);
    if (displayNameValided.error) return displayNameValided;

    const emailValided = emailValid(email);
    if (emailValided.error) return emailValided;

    const passwordValided = passwordValid(password);
    if (passwordValided.error) return passwordValided;

    const userFound = await User.findOne({ where: { email } });
    if (userFound) return { status: 409, error: 'User already registered' };

    const createdUser = await User.create(user);

    return createdUser;
};

module.exports = {
    create,
};