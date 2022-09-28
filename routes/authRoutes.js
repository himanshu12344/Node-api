const { Router } = require('express');
const authController = require('../controller/authController');
const { checkUser } = require('../middleware/authMiddleware');
const router = Router();

router.post('/signup', authController.signup_post);
router.get('/login', checkUser, authController.login_post);
router.get('/users', authController.fetchUsers);

module.exports = router;