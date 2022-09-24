$('#tweetTextArea').keyup((event) => {
	let tweetBox = $(event.target);
	let value = tweetBox.val().trim();
	if (value) {
		$('#submitTweetButton').prop('disabled', false);
	} else {
		$('#submitTweetButton').prop('disabled', true);
	}
});

$('#submitTweetButton').click((event) => {
	const button = $(event.target);
	const tweetBox = $('#tweetTextArea');
	const data = { tweet: tweetBox.val() };
	$.post('/posts/create', data, (tweet, status, xhr) => {
		console.log(tweet);
		var tweetHtml = createTweetLayout(tweet);
		$('#tweetsContainer').prepend(tweetHtml);
		tweetBox.val('');
		$('#submitTweetButton').prop('disabled', true);
	});
});

function createTweetLayout(tweet) {
	return tweet.content;
}
