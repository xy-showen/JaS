var mongoDB=require('mongodb');
var poolModule=require('generic-pool');

var util = require("util");  
var events = require("events");//EventEmitter via events to call on

var config=require('../../config.js').config;

module.exports=MP;//mongo pool

function MP(){
	events.EventEmitter.call(this);  
}
util.inherits(MP, events.EventEmitter);//use util to inherit EventEmitter



MP.prototype.mongoPool= function(){
	var self=this
	return poolModule.Pool({
		name: 'mongodb',
		create: function(callback) {
			var server_options = {
				'auto_reconnect': true,
				poolSize: 1
			};
			var db_options = {
            w: -1, // 设置w=-1是mongodb 1.2后的强制要求，见官方api文档
            logger: {
            	doDebug: true,
            	debug: function(msg, obj) {
            		console.log('[debug]', msg);
            	},
            	// info: function(msg,obj){
            	// 	console.log('[info]', msg);
            	// },
            	log: function(msg, obj) {
            		console.log('[log]', msg);
            	},
            	error: function(msg, obj) {
            		console.log('[error]', msg);
            	}
            }
        };
        mongoDB.MongoClient.connect(config.mongoDB.con_mongo, {
        	server: server_options,
        	db: db_options
        }
        , function(err, db) {
        	console.log("connect mongodb!");
        	callback(err, db);
        	self.emit("succ");
        });
    },
    destroy: function(db) {
    	db.close();
    },
    max: 4, //根据应用的可能最高并发数设置
    idleTimeoutMillis: 30000,
    log: false
});
}
