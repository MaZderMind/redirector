var url = require('url');

exports.collectRules = function (env) {
    var rules = [];

    var envkeys = Object.keys(env)
    envkeys.sort()
    for (var i = 0; i < envkeys.length; i++) {
        var envkey = envkeys[i];
        if (envkey.toUpperCase().indexOf('REDIRECT_') === 0) {
            var value = env[envkey];
            var sep = value.indexOf(':');
            var from = value.substr(0, sep);
            var to = value.substr(sep + 1);

            rules.push([from, to]);
        }
    }

    return rules;
}

exports.calculateRedirection = function (rules, request_url) {
    var path = url.parse(request_url).path;
    var decoded_path = decodeURI(path);
    var normalized_path = normalizeTrailingSlash(decoded_path);

    for (var i = 0; i < rules.length; i++) {
        var from = rules[i][0];
        var to = rules[i][1];

        var normalized_from = normalizeTrailingSlash(from);

        if (normalized_path.indexOf(normalized_from) === 0) {
            var remainder = decoded_path.substr(normalized_from.length);
            if (end(to) === '/' && start(remainder) === '/') {
                remainder = remainder.substr(1);
            }

            if (end(to) !== '/' && start(remainder) !== '/' && remainder.length > 0) {
                remainder = '/' + remainder;
            }

            if (end(path) === '/' && end(remainder) !== '/' && end(to) !== '/') {
                remainder += '/';
            }

            var resolved = url.resolve(request_url, to + remainder);
            return resolved;
        }
    }

    return null;
}

function normalizeTrailingSlash(path) {
    if (end(path) !== '/') {
        path = path + '/';
    }

    return path;
}

function end(str) {
    return str[str.length - 1];
}

function start(str) {
    return str[0];
}