var register=require('./routes/register')
, routes = require('./routes')
, user = require('./routes/user');

module.exports=function(app){
	app.get('/', routes.index);
	app.get('/userInfo', user.getUserInfo);
	app.get('/login',user.login);
	app.get('/signup',register.signup);

	app.get('/active_account',register.active_account);
};