const express = require('express');

const userController = require('../controllers/userController');

const route = express.Router();

route.post('/', userController.create);

module.exports = route;