const express = require('express');

const { postController } = require('../controllers');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, postController.create);

module.exports = route;