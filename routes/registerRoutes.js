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
		User.findOne($or[({ username: username }, { email: email })])
			.then((queriedUser) => {
				if (username != queriedUser.username && email != queriedUser.email) {
					// User registration here
				} else if (username == queriedUser.email) {
					payload.errorMessage = 'Username already exists';
					res.render('register', payload);
				} else {
					payload.errorMessage = 'Email already exists';
					res.render('register', payload);
				}
			})
			.catch((err) => {
				console.log(err);
				payload.errorMessage = 'Something weent wrong. Try againn later.';
				res.render('register', payload);
			});
	} else {
		payload.errorMessage = 'Make sure each field has a valid value.';
		res.render('register', payload);
	}
});

module.exports = router;
