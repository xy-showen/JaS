
/*
 * GET home page.
 */
var fs = require("fs");
exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
fs.readFile("views/index.html", 'utf-8',function(err,data) {
      if (err) throw err;
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(data);
    });
};