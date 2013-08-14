var util=require('util');
var events=require('events');

function UserInfo(){
	events.EventEmitter.call(this);
}
module.exports=UserInfo;

util.inherits(UserInfo, events.EventEmitter);//use util to inherit EventEmitter

UserInfo.prototype.GetUserInfo=function(username,callback){
	var self=this;
	global.mongoPool.acquire(function(err, db) {
		if(err)
		{
			global.mongoPool.release(db);
			callback(err);
			self.emit('err',err);
			throw err;
		}
		else
		{
			db.collection("user_list", function(err, collection) {
				collection.findOne({'username':username},function(err,result){
					if(err)
						{
							global.mongoPool.release(db);
							callback(err);
							self.emit('err',err);
							throw err;
						}
						else
						{

							global.mongoPool.release(db);
							callback(err,result);
							self.emit('_userInfo',result);

						}
				});
			});
		}
	});
}