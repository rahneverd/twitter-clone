$('#tweetTextArea').keyup((event) => {
	let tweetBox = $(event.target);
	let value = tweetBox.val().trim();
	if (value) {
		$('#submitTweetButton').prop('disabled', false);
	} else {
		$('#submitTweetButton').prop('disabled', true);
	}
});
