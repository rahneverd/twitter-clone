const Tweet = require('../models/Tweet');

exports.createPost = function (req, res) {
	tweet = new Tweet(req.body.tweet, req.session.user._id);
	tweet
		.create()
		.then((createdTweet) => {
			res.status(201).send(createdTweet);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
};

exports.feed = function (req, res) {
	Tweet.feed()
		.then((feed) => {
			res.send(feed);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.like = function (req, res) {
	Tweet.like(req.body._id, req.session.user)
		.then((newTweet) => {
			res.send(newTweet);
		})
		.catch((err) => {
			console.log(err);
		});
};
