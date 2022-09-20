const Tweet = require('../models/Tweet');
exports.createPost = function (req, res) {
	tweet = new Tweet(req.body);
	res.status(200).send(tweet);
};
