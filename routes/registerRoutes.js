const router = require('express').Router();
const middleware = require('../middleware');
const User = require('../schemas/userSchema');
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
		User.findOne({ username: username })
			.then(() => {
				User.findOne({ email: email })
					.then(() => {
						console.log('new user');
					})
					.catch(() => {
						console.log('email exists');
					});
			})
			.catch(() => {
				console.log('username exists');
			});
		res.render('register');
	} else {
		payload.errorMessage = 'Make sure each field has a valid value.';
		res.render('register', payload);
	}
});

module.exports = router;
