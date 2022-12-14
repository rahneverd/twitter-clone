const User = require('../models/User');

exports.requireLogin = (req, res, next) => {
	if (req.session && req.session.user) {
		console.log(req.session.user);
		return next();
	} else {
		res.redirect('/login');
	}
};

exports.home = function (req, res) {
	payload = {
		userLoggedIn: req.session.user,
		userLoggedInString: JSON.stringify(req.session.user),
		pageTitle: 'Home',
	};
	res.render('home', payload);
};

exports.notLoggedIn = function (req, res, next) {
	if (!(req.session && req.session.user)) {
		return next();
	} else {
		res.redirect('/');
	}
};

exports.register = function (req, res) {
	user = new User(req.body);
	let payload = req.body;
	user
		.register()
		.then(function (generatedUser) {
			req.session.user = generatedUser;
			res.redirect('/');
		})
		.catch(function (message) {
			payload.backendMessage = message;
			res.render('register', payload);
		});
};

exports.login = function (req, res) {
	user = new User(req.body);
	let payload = req.body;
	user
		.login()
		.then((attemptedUser) => {
			req.session.user = attemptedUser;
			res.redirect('/');
		})
		.catch((message) => {
			payload.errorMessage = message;
			console.log(payload);
			res.render('login', payload);
		});
};

exports.logout = function (req, res) {
	req.session.destroy(() => {
		res.redirect('/login');
	});
};
