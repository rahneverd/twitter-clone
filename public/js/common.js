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

$(document).on('click', '.likeButton', (event) => {
	var button = $(event.target);
	var tweetId = getTweetId(button);
	console.log(tweetId);
});

function getTweetId(element) {
	var isRoot = element.hasClass('tweet');
	var rootElement = isRoot == true ? element : element.closest('.tweet');
	var tweetId = rootElement.data().id;
	return tweetId;
}

function createTweetLayout(tweet) {
	return `<div class='tweet' data-id='${tweet._id}'>
						<div class='mainContentContainer'>
							<div class='userImageContainer'>
								<img src='${tweet.author.profilePic}'>
							</div>
							<div class='tweetContentContainer'>
								<div class='header'>
									<a href='/profile/${tweet.author.username}' class='displayName'>${
		tweet.author.firstName
	} ${tweet.author.lastName}</a>
									<span class='username'>@${tweet.author.username}</span>
									<span class='date'>${timeDifference(
										new Date(),
										new Date(tweet.createdAt)
									)}</span>
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
										<button class='likeButton'>
											<i class="fa-regular fa-heart"></i>
										</button>
									</div>
									
								</div>
							</div>
						</div>
					</div>`;
}

function timeDifference(current, previous) {
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = current - previous;

	if (elapsed < msPerMinute) {
		if (elapsed / 1000 < 30) {
			return 'Just now';
		} else {
			return Math.round(elapsed / 1000) + ' seconds ago';
		}
	} else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + ' minutes ago';
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + ' hours ago';
	} else if (elapsed < msPerMonth) {
		return Math.round(elapsed / msPerDay) + ' days ago';
	} else if (elapsed < msPerYear) {
		return Math.round(elapsed / msPerMonth) + ' months ago';
	} else {
		return Math.round(elapsed / msPerYear) + ' years ago';
	}
}
