var http = require('http');
var funcs = require('./functions');

var rules = funcs.collectRules(process.env);
console.log('configured rules', rules);

http.createServer(function (req, res) {
	var full_url = 
		(req.headers['x-forwarded-proto'] || 'http') +
		'://' +
		(req.headers['x-forwarded-host'] || req.headers['host']) +
		req.url;

	var target = funcs.calculateRedirection(rules, full_url);
	if(target) {
		console.log(full_url+' -> '+target);
		res.writeHead(200);
		res.end(target);
	}
	else
	{
		console.log(full_url+' -> #404');
		res.writeHead(404);
		res.end();
	}
}).listen(8080);
