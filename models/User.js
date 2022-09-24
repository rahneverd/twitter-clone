// requiring packages
const validator = require('validator');
const bcrypt = require('bcrypt');

// requiring files
const usersCollection = require('../schemas/userSchema');

const User = function (data) {
	this.data = data;
	this.errors = [];
	this.cleanupErrors = [];
};

User.prototype.cleanup = function () {
	if (typeof this.data.username != 'string') {
		this.data.username = '';
		this.cleanupErrors.push('Username is not valid');
	}
	if (typeof this.data.email != 'string') {
		this.data.email = '';
		this.cleanupErrors.push('Email is not valid');
	}
	if (typeof this.data.password != 'string') {
		this.data.password = '';
		this.cleanupErrors.push('Password is not valid');
	}
	if (typeof this.data.confirmPassword != 'string') {
		this.data.confirmPassword = '';
		this.cleanupErrors.push('confirmPassword is not valid');
	}
	if (typeof this.data.firstName != 'string') {
		this.data.firstName = '';
		this.cleanupErrors.push('FirstName is not valid');
	}
	if (typeof this.data.lastName != 'string') {
		this.data.lastName = '';
		this.cleanupErrors.push('LastName is not valid');
	}
};

User.prototype.validate = async function () {
	if (this.data.username.length < 4 || this.data.username.length > 12) {
		this.errors.push('Username must be 4 to 12 characters long');
	}
	if (
		this.data.username != '' &&
		!validator.isAlphanumeric(this.data.username)
	) {
		this.errors.push('Username can only contain alphabets and numbers');
	}
	if (this.data.password.length < 8 || this.data.password.length > 16) {
		this.errors.push('Password must be 8 to 16 characters long');
	}
	if (!validator.isEmail(this.data.email)) {
		this.errors.push('Provide a valid email address');
	}
	if (!validator.isAlpha(this.data.firstName)) {
		this.errors.push('First name can only be a string');
	}
	if (!validator.isAlpha(this.data.lastName)) {
		this.errors.push('Last name can only be a string');
	}
	if (
		this.data.username.length > 3 &&
		this.data.username.length < 13 &&
		validator.isAlphanumeric(this.data.username) &&
		validator.isEmail(this.data.email) &&
		validator.isAlpha(this.data.firstName) &&
		validator.isAlpha(this.data.lastName)
	) {
		let userExist = await usersCollection.findOne({
			$or: [{ username: this.data.username }, { email: this.data.email }],
		});
		if (userExist && userExist.username == this.data.username) {
			this.errors.push('Username already exists');
		} else if (userExist && userExist.email == this.data.email) {
			this.errors.push('Email already exists');
		}
	}
};

User.prototype.register = function () {
	return new Promise(async (resolve, reject) => {
		this.cleanup();
		if (this.cleanupErrors.length) {
			reject(this.cleanupErrors);
		} else {
			await this.validate();
			if (this.errors.length) {
				reject(this.errors);
			} else {
				//creating new user
				let salt = bcrypt.genSaltSync(10);
				let hashedPassword = bcrypt.hashSync(this.data.password, salt);
				this.data.password = hashedPassword;
				usersCollection
					.create(this.data)
					.then((generatedUser) => {
						resolve(generatedUser);
					})
					.catch(() => {
						this.errors.push('Try again later');
					});
			}
		}
	});
};

User.prototype.login = function () {
	return new Promise((resolve, reject) => {
		this.cleanup();
		usersCollection
			.findOne({
				$or: [{ username: this.data.username }, { email: this.data.username }],
			})
			.then((attemptedUser) => {
				if (
					attemptedUser &&
					bcrypt.compareSync(this.data.password, attemptedUser.password)
				) {
					resolve(attemptedUser);
				}
			})
			.catch(() => {
				reject('Usernae/Email is not valid');
			});
	});
};

module.exports = User;
