const express = require('express');
const mongoose = require('mongoose');
const middleware = require('./middleware');
require('dotenv').config();
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
// routes
app.use('/', require('./router'));
// app.use('/register', registerRoutes);
// app.use('/login', loginRoutes);
// app.get('/', middleware.requireLogin, (req, res) => {
// 	res.render('home', { pageTitle: 'Home' });
// });

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
