const TweetModelSchema = require('../schemas/tweetSchema');
Tweet = function (data) {
	this.data = data;
};

module.exports = Tweet;
