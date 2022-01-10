const {
    DISPLAYNAME_INCORRECT_LENGTH,
    EMAIL_IS_REQUIRED,
    EMAIL_NOT_VALID,
    EMAIL_EMPTY,
    PASSWORD_IS_REQUIRED,
    PASSWORD_INCORRECT_LENGTH,
    PASSWORD_EMPTY,
} = require('../erros');

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

module.exports = {
    displayNameValid,
    emailValid,
    passwordValid,
};