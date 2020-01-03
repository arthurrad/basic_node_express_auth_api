const router = require('express').Router();

const authController = require('../controllers/auth');
const authMiddleware = require('../helpers/verifyToken');


router.post('/register', authController.register);
router.post('/verifyEmail', authController.verifyEmail);
router.post('/login', authController.login);
router.get('/current', authMiddleware.auth , authController.current);

module.exports = router;