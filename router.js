const router = require('express').Router();
const userController = require('./controllers/userController');
const tweetController = require('./controllers/tweetController');

// USER RELATED ROUTES
// Home Route
router.get('/', userController.requireLogin, userController.home);
// Login route
router.get('/login', userController.notLoggedIn, (req, res) =>
	res.render('login', { pageTitle: 'Login' })
);
router.post('/login', userController.notLoggedIn, userController.login);
// Registration Routes
router.get('/register', userController.notLoggedIn, (req, res) =>
	res.render('register', { pageTitle: 'Register', backendMessage: [] })
);
router.post('/register', userController.notLoggedIn, userController.register);
module.exports = router;
// Logout route
router.get('/logout', userController.requireLogin, userController.logout);

// POST RELATED ROUTES
// Create Post
router.post(
	'/posts/create',
	userController.requireLogin,
	tweetController.createPost
);
//
