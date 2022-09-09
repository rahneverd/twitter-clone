const router = require('express').Router();
const userController = require('./controllers/userController');

// Home Route
router.get('/', userController.requireLogin, userController.home);
// Registration Routes
router.get('/register', userController.notLoggedIn, (req, res) =>
	res.redirect('register')
);
router.post('/register', userController.notLoggedIn, userController.register);
module.exports = router;
