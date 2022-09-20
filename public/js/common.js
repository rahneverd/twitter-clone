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
	let button = $(event.target);
	let tweetBox = $('#tweetTextArea');
});
