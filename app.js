const express = require('express');
const bodyParser = require("body-parser");
const credentials = require("./credentials.js");
let app = express();



// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('cookie-parser')(credentials.cookieSecret));

app.use(require("express-session")({
	resave: false,
	saveUnitialized: false,
	secret: credentials.cookieSecret,
	cookie: { secure: false }
}));


//Configures Database Calls
 const options = { server: { socketOption: { keepAlive: 1 } } };

let mongooseLogin = require("mongoose");
let dblogin = mongooseLogin.createConnection('mongodb://dbuser:dbpassword1@ds053140.mlab.com:53140/login', options);
let Login = require('./models/login.js')(dblogin);


dblogin.on('error', console.error.bind(console, 'connection error:'));
dblogin.once('open', function() { console.log("dbLogin connected") });


let loginHelpers = require("./helpers/loginHelper.js")({ Login: Login });


// Basic Web Pages
app.get('', function(req, res) {
	res.render('home');
});

app.get('/contact', function(req, res) {
	res.render('contact');
});

app.get('/about', function(req, res) {
	res.render('about');
});




// Login screen should display the form
app.get('/login', loginHelpers.getlogin);
app.get('/newlogin', loginHelpers.getNewLogin);
app.post('/newlogin', loginHelpers.postLogin);
app.post('/login', loginHelpers.postLogin);

//App Specific Pages

app.get('/dashboard/:id', loginHelpers.userChecker, function(req, res) {
	res.render('dashboard');
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
