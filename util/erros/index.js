const { StatusCodes } = require('http-status-codes');

const USER_ALREADY_REGISTERED = {
    status: StatusCodes.CONFLICT,
    message: 'User already registered',
};

const EMAIL_IS_REQUIRED = {
    status: StatusCodes.BAD_REQUEST,
    message: '"email" is required',
};

const EMAIL_NOT_VALID = {
    status: StatusCodes.BAD_REQUEST,
    message: '"email" must be a valid email',
};

const DISPLAYNAME_INCORRECT_LENGTH = {
    status: StatusCodes.BAD_REQUEST,
    message: '"displayName" length must be at least 8 characters long',
};

const PASSWORD_IS_REQUIRED = {
    status: StatusCodes.BAD_REQUEST,
    message: '"password" is required',
};

const PASSWORD_INCORRECT_LENGTH = {
    status: StatusCodes.BAD_REQUEST,
    message: '"password" length must be 6 characters long',
};

module.exports = {
    USER_ALREADY_REGISTERED,
    EMAIL_IS_REQUIRED,
    EMAIL_NOT_VALID,
    DISPLAYNAME_INCORRECT_LENGTH,
    PASSWORD_IS_REQUIRED,
    PASSWORD_INCORRECT_LENGTH,
};
