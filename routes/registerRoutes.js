const router = require('express').Router();
const middleware = require('../middleware');
//
router.get('/', middleware.notLoggedIn, (req, res) => {
	res.render('register');
});

router.post('/', middleware.notLoggedIn, (req, res) => {
	let firstName = req.body.firstName.trim();
	let lastName = req.body.lastName.trim();
	let username = req.body.username.trim();
	let email = req.body.email.trim();
	let password = req.body.password;

	let payload = req.body;

	if (firstName && lastName && username && email && password) {
		console.log('congrats');
		res.render('register');
	} else {
		payload.errorMessage = 'Make sure each field has a valid value.';
		res.render('register', payload);
	}
});

module.exports = router;
