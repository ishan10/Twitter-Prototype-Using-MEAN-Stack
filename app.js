
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , home = require('./routes/home')
  , signUp = require('./routes/signup')
 , index = require('./routes/index')
 , login = require('./routes/login')
 , session = require('client-sessions')
 , searchPage = require('./routes/search');

var app = express();

// all environments
//configure the sessions with our application
app.use(session({   
	  
	cookieName: 'session',    
	secret: 'cmpe273_twitter',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently



app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/** Get Requests**/
app.get('/', home.showHome);
app.get('/home', home.showHome);
app.get('/signUp', signUp.signupHome);
app.get('/success', signUp.success);
app.get('/twitterHome', home.twitterHome);
app.get('/showProfile', home.showProfile);
app.get('/showSearchPage', searchPage.showSearchPage);
/*app.get('/', signUp.fetchtweets);*/

/** Post Requests**/
app.post('/checkUser', signUp.checkUser);
app.post('/login', login.checkLogin);
app.post('/dashboards', home.showDashboard);
app.post('/getFeed', home.getFeed);
app.post('/createTweet', home.createTweet);
app.post('/getProfileDetails', home.getProfileDetails);
app.post('/getProfileTweets', home.getProfileTweets);
app.post('/getMyFollowing', home.getMyFollowing);
app.post('/getMyFollowers', home.getMyFollowers);
app.post('/reTweet', home.reTweet);
app.post('/searchSession', searchPage.searchSession);
app.post('/getSearchResults', searchPage.search);
app.post('/showUserProfile', home.showUserProfile);
app.post('/signOut', login.signOut);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
