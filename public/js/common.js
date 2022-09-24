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
		var tweetHtml = createTweetLayout(tweet);
		$('#tweetsContainer').prepend(tweetHtml);
		tweetBox.val('');
		$('#submitTweetButton').prop('disabled', true);
	});
});

function createTweetLayout(tweet) {
	return `<div class='tweet'>
						<div class='mainContentContainer'>
							<div class='userImageContainer'>
								<img src='${tweet.author.profilePic}'>
							</div>
							<div class='tweetContentContainer'>
								<div class='header'>
									<a href='/profile/${tweet.author.username}' class='displayName'>${tweet.author.firstName} ${tweet.author.lastName}</a>
									<span class='username'>@${tweet.author.username}</span>
									<span class='date'>${tweet.createdAt}</span>
								</div>
								<div class='tweetBody'>
									<span>${tweet.content}</span>
								</div>
								<div class='footer'>
									<div class='tweetButtonsContainer'>
										<button>
											<i class="fa-regular fa-comment"></i>
										</button>
										<button>
											<i class="fa-solid fa-retweet"></i>
										</button>
										<button>
											<i class="fa-regular fa-heart"></i>
										</button>
									</div>
									
								</div>
							</div>
						</div>
					</div>`;
}
