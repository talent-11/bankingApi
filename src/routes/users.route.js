const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const userControllers = require('../controllers/users.controllers');
const router = express.Router();

router.post('/signup', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.get('/me', checkAuth, userControllers.getMe);
router.post('/confirm', checkAuth, userControllers.userConfirm);

module.exports = router