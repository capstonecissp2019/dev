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
/* const options = { server: { socketOption: { keepAlive: 1 } } };

let mongooseLogin = require("mongoose");
let dbLogin = mongooseLogin.createConnection('mongodb://dbuser:dbpassword1@ds127644.mlab.com:27644/project6_login', options);
let Login = require('./models/login.js')(dbLogin);

let  mongooseSkill= require("mongoose");
let dbSkill = mongooseSkill.createConnection('mongodb://dbuser:dbpassword1@ds227664.mlab.com:27664/project6_qb_data', options);
let skill = require('./models/player.js')(dbSkill);

let mongooseUser = require("mongoose");
let dbUser = mongooseUser.createConnection('mongodb://dbuser:dbpassword1@ds227664.mlab.com:27664/project6_qb_data', options);
let user = require('./models/player.js')(dbUser);

dbLogin.on('error', console.error.bind(console, 'connection error:'));
dbLogin.once('open', function() { console.log("dbLogin connected") });

dbSkill.on('error', console.error.bind(console, 'connection error:'));
dbSkill.once('open', function() { console.log("dbSkill connected") });

dbUser.on('error', console.error.bind(console, 'connection error:'));
dbUser.once('open', function() { console.log("dbUser connected") });

 */

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
