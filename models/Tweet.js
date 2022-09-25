const tweetsCollection = require('../schemas/tweetSchema');
const userscollection = require('../schemas/userSchema');
const User = require('./User');
const validator = require('validator');

const Tweet = function (data, author) {
	this.data = {
		content: data,
		author: author,
	};
	this.errors = [];
};

Tweet.prototype.cleanUp = function () {
	if (typeof this.data.content != 'string') {
		this.data.content = '';
	}
};

Tweet.prototype.validate = function () {
	if (!this.data.content.length) {
		this.errors.push('Tweet cannot be empty');
	} else if (this.data.content.length && this.data.content.length > 200) {
		this.errors.push('Tweet can ony be 1 to 200 characters long');
	}
};

Tweet.prototype.create = function () {
	return new Promise(async (res, rej) => {
		this.cleanUp();
		this.validate();
		if (this.errors.length) {
			rej(this.errors);
		} else if (!this.errors.length) {
			createdTweet = await tweetsCollection.create(this.data);
			createdTweet = await userscollection.populate(createdTweet, {
				path: 'author',
			});
			createdTweet.author = User.populate(createdTweet.author);
			res(createdTweet);
		} else {
			rej('Try again later!');
		}
	});
};

Tweet.feed = function () {
	return new Promise((resolve, reject) => {
		tweetsCollection
			.find()
			.populate('author', '-password')
			.then(async (feed) => {
				resolve(feed);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

Tweet.like = function (postId, user, callBack) {
	return new Promise((resolve, reject) => {
		liked = user.likes.includes(postId);
		if (!liked) {
			tweetsCollection
				.findByIdAndUpdate(
					postId,
					{ $push: { likes: user._id } },
					{ safe: true, upsert: true, new: true }
				)
				.then((newTweet) => {
					userscollection
						.findByIdAndUpdate(
							user._id,
							{ $push: { likes: postId } },
							{ safe: true, upsert: true, new: true }
						)
						.then((newUser) => {
							callBack(newUser);
						});
					resolve(newTweet);
				});
		} else {
			tweetsCollection
				.findByIdAndUpdate(
					postId,
					{ $pull: { likes: user._id } },
					{ safe: true, upsert: true, new: true }
				)
				.then((newTweet) => {
					userscollection
						.findByIdAndUpdate(
							user._id,
							{ $pull: { likes: postId } },
							{ safe: true, upsert: true, new: true }
						)
						.then((newUser) => {
							callBack(newUser);
						});
					resolve(newTweet);
				});
		}
	});
};

module.exports = Tweet;
