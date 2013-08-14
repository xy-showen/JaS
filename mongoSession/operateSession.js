var util=require('util');
var events=require('events');
var crypto=require('crypto');
var config=require('../config.js').config;


function mongoSession(){
	events.EventEmitter.call(this);
}

module.exports=mongoSession;
util.inherits(mongoSession, events.EventEmitter);


mongoSession.prototype.upsertLoginSession=function (username,survivalTime,callback){
	var self=this;
	var MD5=crypto.createHash('md5');
	var timestamp=new Date().getTime();
	MD5.update(username+timestamp);
	logger.debug('timestamp:'+timestamp+',secrect:'+config.mongoSessionSecrect);
	var JandSSession=MD5.digest('hex');
	global.mongoPool.acquire(function(err,db){
		if(err)
		{
			global.mongoPool.release(db);
			callback(err);
			throw err;
		}
		else
		{
			db.collection('user_Session',function(err,collection){
				collection.update({'userName':username},{$set:{'JandSSession':JandSSession,'timestamp':timestamp}},{upsert:true}
					,function(err,result){
					if(err)
					{
						global.mongoPool.release(db);
						callback(err);
						throw err;							
					}
					else
					{
						global.mongoPool.release(db);
						callback(err,result,JandSSession);
					}
				});
			});
		}
	});
};

mongoSession.prototype.checkSession=function (userName,callback){
	var self=this;
	console.log(userName);
	global.mongoPool.acquire(function(err,db){
		if(err)
		{
			global.mongoPool.release(db);
			callback(err);
			throw err;
		}
		else
		{
			db.collection('user_Session',function(err,collection){
				collection.findOne({"userName":userName}
					,function(err,result){
					if(err)
					{
						global.mongoPool.release(db);
						callback(err);
						throw err;
					}
					else
					{
						global.mongoPool.release(db);
						callback(err,result);
					}
				});
			});
		}
	});

};