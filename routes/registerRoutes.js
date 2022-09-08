const router = require('express').Router();
const middleware = require('../middleware');
//
router.get('/', middleware.notLoggedIn, (req, res) => {
	res.render('register');
});

router.post('/', middleware.notLoggedIn, (req, res) => {
	console.log(req.body);
	res.render('register');
});

module.exports = router;
