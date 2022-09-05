const express = require('express');
const mongoose = require('mongoose');
const middleware = require('./middleware');
require('dotenv').config();
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static('public'));

app.use('/login', loginRoutes);

app.get('/', middleware.requireLogin, (req, res) => {
	res.render('home', { pageTitle: 'Home' });
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on Port ${process.env.PORT}`);
});
