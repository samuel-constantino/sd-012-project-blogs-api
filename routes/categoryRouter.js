const express = require('express');

const { categoryController } = require('../controllers');
const auth = require('../middlewares/auth');

const route = express.Router();

route.get('/', auth, categoryController.findAll);

route.post('/', auth, categoryController.create);

module.exports = route;