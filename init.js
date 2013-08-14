var fs=require('fs');
var log4js=require('log4js');
var MP=require('./DB/mongoDB/initMongoPool.js');
global.mongoPool=null;
//global.config=null;
global.logger=null;

/**
  string's trim
  **/
// String.prototype.trim=function(){  
// 	　　    return this.replace(/(^\s*)|(\s*$)/g, "");  
// 　　 }  
// 　　 String.prototype.ltrim=function(){  
// 	　　    return this.replace(/(^\s*)/g,"");  
// 　　 }  
// 　　 String.prototype.rtrim=function(){  
// 	　　    return this.replace(/(\s*$)/g,"");  
// 　　 }  



module.exports=function(){

	/**
	  init logger
	  **/
	  log4js.configure({
	  	appenders: [
	  	{ type: 'console' },
	  	{type:'file',filename:'logs/dail.log'}
	  	],
	  	replaceConsole:true
	  });

	  global.logger=log4js.getLogger('filelog');
    //logger.setLevel('ERROR');
    console.log('logger is initialized...');

   process.on('uncaughtException', function (err) {  //Process to catch exceptions
   	logger.error('Caught exception: ' + err);
   });

	/**
	  init config
	  **/
	  // var data=fs.readFileSync('./config.json','utf-8');

	  // if(!data)
	  // {
	  // 	console.log("init config fail!!!");
	  // 	return;
	  // }
	  // else
	  // {
	  // 	global.config=JSON.parse(data);
	  // 	console.log('config is initialized...');
	  // }


    /**
	  init mongoPoolPool
	  **/
	  var mp=new MP();
	  global.mongoPool=mp.mongoPool();

	  if(mongoPool.getName())//create mongoPool is succ
	  {
	  	console.log('create mongoPool is succ....');
	  	// mongoPool.acquire(function(err, db) {//
	  	// 	mongoPool.release(db);
	  	// });
}
// 	  mp.on('succ',function(){
// 	  	console.log('succ....');
// 	  });
// for(var i=0;i<5;i++){
// 	  mongoPool.acquire(function(err, db) {
// 	  	mongoPool.release(db);
// 	  });
// 	  console.log(mongoPool.getName()+mongoPool.getPoolSize());
// 	}
	   //  mongoPool.acquire(function(err, db) {
	   //  console.log('..');
    //     if (err) {
    //     	console.log('err');
    //     } else {

    //         db.collection("user_list", function(err, collection) {
    //             collection.find().toArray(function(err, results) {
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                     console.log(results);
    //                     mongoPool.release(db);
    //                 }

    //             });
    //         });

    //     }
    // });

}