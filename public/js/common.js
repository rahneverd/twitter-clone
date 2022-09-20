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

	const tweet = {
		content: tweetBox.val(),
	};
	$.post('/posts/create', tweet, (tweetData, status, xhr) => {});
});
