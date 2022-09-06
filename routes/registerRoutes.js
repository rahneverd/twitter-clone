const router = require('express').Router();
const middleware = require('../middleware');
//
router.get('/', middleware.notLoggedIn, (req, res) => {
	res.render('register');
});

module.exports = router;
