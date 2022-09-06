const router = require('express').Router();
const middleware = require('../middleware');
//
router.get('/', middleware.notLoggedIn, (req, res) => {
	res.render('login');
});

module.exports = router;
