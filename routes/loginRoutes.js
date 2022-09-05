const router = require('express').Router();
const middleware = require('../middleware');

router.get('/', middleware.notLoggedIn, (req, res) => {
	res.send('login');
});

module.exports = router;
