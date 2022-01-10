const express = require('express');

const { userController } = require('../controllers');
const auth = require('../middlewares/auth');

const route = express.Router();

route.get('/', auth, userController.findAll);

route.post('/', userController.create);

module.exports = route;