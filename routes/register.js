var check=require('validator').check,
sanitize=require('validator').sanitize;
var mailer=require('nodemailer');
var U=require('../models/user.js');
var mailer=require('../services/mail.js');
var crypto=require('../services/crypto.js')
var config=require('../config.js').config;
var register_db=require('../DB/mongoDB/login/register.js');
exports.signup=function(req,res){
	var user=new U();

	user.userName=sanitize(req.query.username).xss();
	user.passwd=sanitize(req.query.passwd).xss();
	var re_passwd=sanitize(req.query.re_passwd).xss();
	user.email=sanitize(req.query.email).xss().toLowerCase();
	// user.isActive=0;
	if(user.userName===''||user.passwd===''
		||user.re_passwd===''||user.email===''){
		res.end('message is not full');
	return;
}

if(user.userName.length<3){
	res.end('too short');
	return;
}

if(user.passwd!==re_passwd)
{
	res.end('passwd is not same as re_passwd');
	return;
}

try{
	check(user.userName,'username only usre 0-9,a-z,A-Z').isAlphanumeric();
}catch(e){
	res.end(e.message);
	return;
}

try {
	check(user.email,'email is not right').isEmail();
}catch(e){
	res.end(e.message);
	return;
}

user.isActive='0';

register_db.signup(user,req,res,function(err,data){
//
if(err)
{
	if(err==='1'){
		res.end('username has exist');
	}
	else if(err==='2')
	{
		res.end('email has exist')
	}
	else
	{
		res.end('has err');
	}
}
else
{
	mailer.sendActiveMail(user.email,crypto.md5(user.userName+config.cryptoSecrect),user.userName)
	res.end('has send active email'+user.email+user.userName);
}
});

};

exports.active_account=function(req,res){
	var key=req.query.key;
	var userName=req.query.userName;
	if(key!==crypto.md5(userName+config.cryptoSecrect))
	{
		res.end('link info has not right');
	}
	else
	{
		register_db.active_account(key,userName,req,res,function(err,data){
			if(err)
			{
				if(err==='1')
				{
					res.end('no the user');
				}
				else if (err==='2')
				{
					res.end('has active')				
				}
				else
				{
					res.end('has err');
				}
			}
			else
			{
				//res.end('===========');
				res.end('has active '+userName);
			}
		});
	}
};