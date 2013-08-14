
exports.signup=function(user,req,res,callback){

	global.mongoPool.acquire(function(err,db){
		if(err)
		{
			global.mongoPool.release(db);
			callback(err);
		}
		else
		{
			db.collection('JaS_users',function(err,collection){
				collection.findOne({'userName':user.userName},function(err,result)
				{
					if(err)
					{
						global.mongoPool.release(db);
						callback(err);
						throw err;
					}
					else
					{
						if(result)
						{
							global.mongoPool.release(db);
							callback('1')
						}
						else
						{
							collection.findOne({'email':user.email},function(err,result){
								if(err)
								{
									global.mongoPool.release(db);
									callback(err);
									throw err;
								}
								else
								{
									if(result)
									{
										global.mongoPool.release(db);
										callback('2')
									}
									else
									{
										collection.insert({'userName':user.userName
											,'passwd':user.passwd
											,'email':user.email
											,'isActive':user.isActive},function(err,result){
												if(err)
												{
													global.mongoPool.release(db);
													callback(err);
												}
												else
												{
													global.mongoPool.release(db);
													callback(err,result)
												}
											});
									}
								}
							});
						}
					}
				});
});
}
});


};

exports.active_account=function(key,userName,req,res,callback){
	global.mongoPool.acquire(function(err,db){
		if(err)
		{
			global.mongoPool.release(db);
			callback(err);
			throw err;
		}
		else
		{
			db.collection('JaS_users',function(err,collection){
				collection.findOne({'userName':userName},function(err,result){
					if(err)
					{
						global.mongoPool.release(db);
						callback(err);
						throw err;
					}
					else
					{
						if(result)
						{
							if(result.isActive==='1')
							{
								global.mongoPool.release(db);
								callback('2');
							}
							else
							{
								collection.update({'userName':userName},{$set:{'isActive':'1'}},function(err){
									if(err)
									{
										global.mongoPool.release(db);
										callback(err);
										throw err;
									}
									else
									{

										global.mongoPool.release(db);
										callback(err);
									}

								});

							}
						}
						else
						{
							global.mongoPool.release(db);
							callback('1');
						}
					}
				});
			});
		}
	});
};