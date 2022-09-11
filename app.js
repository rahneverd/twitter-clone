const express = require('express');
const mongoose = require('mongoose');
const middleware = require('./middleware');
require('dotenv').config();
const session = require('express-session');
const mongoStore = require('connect-mongo');
const app = express();

// Setting view engine
app.set('view engine', 'pug');
app.set('views', 'views');

// Setting Pubic folder
app.use(express.static('public'));

// Setting up bodyparser
app.use(express.urlencoded({ extended: false }));

// Setting up session
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
			httpOnly: true,
		},
	})
);

// routes
app.use('/', require('./router'));

// Connecting to DataBase
mongoose
	.connect(process.env.CONNECTION)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on Port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
