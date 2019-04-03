const express = require('express');

let app = express();

// Set up mongoose connection
/* let mongoose = require('mongoose');
mongoose.connect('mongodb://labuser:rpeEnMN2fjtMiD2@ds249233.mlab.com:49233/lab-8');

let Kitten = require('./models/kitten.js'); */

// Open the connection
/* let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("worked");
});
 */
// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('', function(req, res) {
	res.render('home');
});

app.get('/contact', function(req, res) {
	res.render('contact');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/list/:catname', function(req, res) {
	
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
