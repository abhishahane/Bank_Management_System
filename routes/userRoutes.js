const { Router } = require('express');
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

const router = Router();

// user routes

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', requireAuth, userController.logout);
router.get('/user', requireAuth, userController.getUser);
router.put('/user', requireAuth, userController.updateUser);
router.delete('/user', requireAuth, userController.deleteUser);

module.exports = router;
