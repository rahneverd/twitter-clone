const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: mongoose.ObjectId,
			required: true,
			ref: 'User',
		},
		pinned: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

let TweetModelSchema = mongoose.model('Tweet', tweetSchema);

module.exports = TweetModelSchema;
