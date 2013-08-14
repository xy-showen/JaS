var mailer=require('nodemailer');
var config=require('../config.js').config;

// var mail_opts= {
//     host: 'smtp.163.com',
//     port: 25,
//     auth: {
//       user: 'daxiaguazi@163.com',
//       pass: 'daxia213guazi214'
//     }
//   };
  var transport=mailer.createTransport('SMTP',config.mail_opts);


  //console.log(global.config.hostname);
  var SITE_URL='http://'+config.hostname+(config.port!==80?':'+config.port:'');
 // var SITE_URL='http://192.168.1.104:3000';
  var sendMail=function(data){
  	transport.sendMail(data,function(err){
  		if(err)
  			{
  				console.log(err);
  			}
  	});
  };

  exports.sendActiveMail=function(who,key,userName){
  	var from='daxiaguazi@163.com';
  	var to=who;
  	var subject='JaS active..';
  	var html='<p>您好：<p/>' +
    '<p>我们收到您在JaS社区的注册信息，请点击下面的链接来激活帐户：</p>' +
    '<a href="' + SITE_URL+ '/active_account?key=' + key + '&userName=' + userName + '">激活链接</a>' +
    '<p>若您没有在JaS社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + "JaS" + '社区 谨上。</p>'

    sendMail({
    	from:from,
    	to:to,
    	subject:subject,
    	html:html
    });
  };