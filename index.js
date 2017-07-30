var url = require('url');
var http = require('http');

var rules = [];

var envkeys = Object.keys(process.env)
envkeys.sort()
for(var i = 0; i < envkeys.length; i++) {
	var envkey = envkeys[i];
	if(envkey.toUpperCase().indexOf('REDIRECT') === 0) {
		var value = process.env[envkey];
		var sep = value.indexOf(':');
		var from = value.substr(0, sep);
		var to = value.substr(sep+1);

		rules.push([from, to]);
	}
}

console.log('configured rules', rules);

http.createServer(function (req, res) {
	var full_url = 
		(req.headers['x-forwarded-proto'] || 'http') +
		'://' +
		(req.headers['x-forwarded-host'] || req.headers['host']) +
		req.url;

	var target = calculateRedirection(full_url);
	if(target) {
		console.log(decoded_url+' -> '+target);
		res.writeHead(200);
		res.end(target);
	}
	else
	{
		console.log(decoded_url+' -> #404');
		res.writeHead(404);
		res.end();
	}
}).listen(8080);

function calculateRedirection(url) {
	var path = url.parse(url).path
	var decoded_path = decodeURI(path);
	var normalized_path = normalizeTrailingSlash(decoded_path);

	for(var i = 0; i < rules.length; i++) {
		var from = rules[i][0];
		var to = rules[i][1];

		var normalized_from = normalizeTrailingSlash(from);

		if(normalized_url.indexOf(normalized_from) === 0) {
			var remainder = decoded_path.substr(from.length);
			var target = url.resolve(full_url, to + remainder);

			return target);
		}
	}

	return null;
}

function normalizeTrailingSlash(path) {
	if(path[path.length - 1] != '/') {
		path = path + '/';
	}

	return path;
}