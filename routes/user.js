

//var login=require('../DB/mongoDB/login/login.js');

var UF=require('../DB/mongoDB/userInfo/getUserInfo.js');
var operateS=require('../mongoSession/operateSession.js');
//var mailer=require('../services/mail.js');
//var U=require('../models/user.js');
//var crypto=require('../services/crypto.js')
//var config=require('../config.js').config;
// exports.signup=function(req,res){
// 	var user=new U();

// 	user.userName=sanitize(req.query.username).xss();
// 	user.passwd=sanitize(req.query.passwd).xss();
// 	var re_passwd=sanitize(req.query.re_passwd).xss();
// 	user.email=sanitize(req.query.email).xss().toLowerCase();
// 	// user.isActive=0;
// 	if(user.userName===''||user.passwd===''
// 		||user.re_passwd===''||user.email===''){
// 		res.end('message is not full');
// 	return;
// }

// if(user.userName.length<3){
// 	res.end('too short');
// 	return;
// }

// if(user.passwd!==re_passwd)
// {
// 	res.end('passwd is not same as re_passwd');
// 	return;
// }

// try{
// 	check(user.userName,'username only usre 0-9,a-z,A-Z').isAlphanumeric();
// }catch(e){
// 	res.end(e.message);
// 	return;
// }

// try {
// 	check(user.email,'email is not right').isEmail();
// }catch(e){
// 	res.end(e.message);
// 	return;
// }

// user.isActive='0';

// login.signup(user,req,res,function(err,data){
// //
// if(err)
// {
// 	if(err=='1'){
// 		res.end('username has exist');
// 	}
// 	else if(err==='2')
// 	{
// 		res.end('email has exist')
// 	}
// 	else
// 	{
// 		res.end('has err');
// 	}
// }
// else
// {
// 	mailer.sendActiveMail(user.email,crypto.md5(user.email+user.userName+config.cryptoSecrect),user.userName)
// 	res.end('has send active email'+user.email+user.userName);
// }
// });

// };


exports.getUserInfo = function(req, res){
	var userInfo=new UF();
	userInfo.GetUserInfo('showen',function(err,result){
		if(err)
		{
			res.end('err..');
		}
		else
		{
			res.end(JSON.stringify(result));
		}
	});
	// userInfo.on('_userInfo',function(result){
	// 	res.end(JSON.stringify(result));
	// });

	//logger.debug(result);
	//res.end(JSON.stringify(result)+'III');
};

exports.login=function(req,res){
	var operateSession=new operateS();
	if(req.headers.cookie)
	{
		//console.log('y');
		var cookies=req.headers.cookie.split(';');
		//console.log(cookies);
		for(var i=0;i<cookies.length;i++)
		{
			//console.log("=="+cookies[i].split('=')[0]+"==");
			//var JandSCookie=cookies[i].split('=')[0];
			if(cookies[i].split('=')[0].trim()==='JandSCookie')
			{
				var JandSCookie=cookies[i].split('=')[1].trim();
			}
			if(cookies[i].split('=')[0].trim()==='userName')
			{
				var userName=cookies[i].split('=')[1].trim();
			}
			if(JandSCookie && userName)
			{
				console.log('has exit');
				operateSession.checkSession(userName
					,function(err,result){
						if(err)
						{
							console.log(err);
							res.end("Verify the session failed..");
						}
						else
						{
							console.log(result.JandSSession);
							if(result.JandSSession==JandSCookie)
							{
								res.end("Verify the session succ..");
							}
							else
							{
								res.end("Verify the session failed..");
							}
						}
					});
				return;
				//operateSession.checkSession(userName,JandSCookie);
			}
		}
		operateSession.upsertLoginSession('showen',-1
			,function(err,result,JandSCookie){
				if(err)
				{
					console.log(err);
					res.end('add session fail..')
				}
				else
				{

					res.setHeader("Set-Cookie"
						,["JandSCookie="+JandSCookie+";Max-Age=60",
						"userName=showen;Max-Age=60"]);
					console.log("add session succ...");
					res.end('add session succ');

				}
			});
	}
	else
	{
		console.log('n');
		operateSession.upsertLoginSession('showen'
			,function(err,result,JandSCookie){
				if(err)
				{
					console.log(err);
					console.log("add session fail...");
				}
				else
				{

					res.setHeader("Set-Cookie"
						,["JandSCookie="+JandSCookie+";Max-Age=60",
						"userName=showen;Max-Age=60"]);
					console.log("add session succ...");
					res.end('add session succ');
				}
			});
	}
};