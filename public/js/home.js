$(document).ready(() => {
	$.get('/posts/feed', (feed) => {
		outputTweets(feed, $('#tweetsContainer'));
	});
});

function outputTweets(tweets, tweetsContainer) {
	tweets.forEach((tweet) => {
		var tweetHtml = createTweetLayout(tweet);
		tweetsContainer.prepend(tweetHtml);
	});
}
