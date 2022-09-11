const User = require('../models/User');

exports.home = function () {
	res.render('home');
};

exports.requireLogin = (req, res, next) => {
	if (req.session && req.session.user) {
		return next();
	} else {
		res.redirect('/login');
	}
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
		.then()
		.catch((message) => {
			payload.backendMessage = message;
			res.render('register', payload);
		});
};
