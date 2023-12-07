const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController')

router.post('/login', userController.login);
router.get('/check-login', userController.checkLogin);
router.post('/create-user', userController.createUser);
router.post('/logout', userController.logout);

module.exports = router