$(document).ready(() => {
	$.get('/posts/feed', (feed) => {
		if (feed.length) {
			outputTweets(feed, $('#tweetsContainer'));
		}
	});
});

function outputTweets(tweets, tweetsContainer) {
	tweets.forEach((tweet) => {
		var tweetHtml = createTweetLayout(tweet);
		tweetsContainer.prepend(tweetHtml);
	});
}
