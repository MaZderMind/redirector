var calculateRedirection = require('../functions.js').calculateRedirection;

describe("calculateRedirection", function() {
    function runTests(rules, tests) {
        tests.forEach(function(test) {
            var from = test[0];
            var to = test[1];

            it('redirects '+from+' -> '+to, function() {
                expect(calculateRedirection(rules, from)).toBe(to);
            });

        })
    }

    describe('Rule: /foo -> /bar', function() {
        var rules = [
            ['/foo', '/bar']
        ];
        var tests = [
            ['http://domain.example/foo',      'http://domain.example/bar'],
            ['http://domain.example/foo/',     'http://domain.example/bar/'],
            ['http://domain.example/foo/moo',  'http://domain.example/bar/moo'],
            ['http://domain.example/foo/moo/', 'http://domain.example/bar/moo/'],
            ['http://domain.example/fooo',     null],
            ['http://domain.example:8080/foo', 'http://domain.example:8080/bar'],
            ['https://domain.example/foo',     'https://domain.example/bar']
        ];

        runTests(rules, tests);
    });

    describe('Rule: /foo -> /bar/', function() {
        var rules = [
            ['/foo', '/bar/']
        ];
        var tests = [
            ['http://domain.example/foo',      'http://domain.example/bar/'],
            ['http://domain.example/foo/',     'http://domain.example/bar/'],
            ['http://domain.example/foo/moo',  'http://domain.example/bar/moo'],
            ['http://domain.example/foo/moo/', 'http://domain.example/bar/moo/'],
            ['http://domain.example/fooo',     null],
            ['http://domain.example:8080/foo', 'http://domain.example:8080/bar/'],
            ['https://domain.example/foo',     'https://domain.example/bar/']
        ];

        runTests(rules, tests);
    });

    describe('Rule: /foo -> /bar/', function() {
        var rules = [
            ['/foo', '/bar/']
        ];
        var tests = [
            ['http://domain.example/foo',      'http://domain.example/bar/'],
            ['http://domain.example/foo/',     'http://domain.example/bar/'],
            ['http://domain.example/foo/moo',  'http://domain.example/bar/moo'],
            ['http://domain.example/foo/moo/', 'http://domain.example/bar/moo/'],
            ['http://domain.example/fooo',     null],
            ['http://domain.example:8080/foo', 'http://domain.example:8080/bar/'],
            ['https://domain.example/foo',     'https://domain.example/bar/']
        ];

        runTests(rules, tests);
    });

    describe('Rule: /foo/ -> /bar/', function() {
        var rules = [
            ['/foo/', '/bar/']
        ];
        var tests = [
            ['http://domain.example/foo',      'http://domain.example/bar/'],
            ['http://domain.example/foo/',     'http://domain.example/bar/'],
            ['http://domain.example/foo/moo',  'http://domain.example/bar/moo'],
            ['http://domain.example/foo/moo/', 'http://domain.example/bar/moo/'],
            ['http://domain.example/fooo',     null],
            ['http://domain.example:8080/foo', 'http://domain.example:8080/bar/'],
            ['https://domain.example/foo',     'https://domain.example/bar/']
        ];

        runTests(rules, tests);
    });

    describe('Rule: /foo -> https://other.example', function() {
        var rules = [
            ['/foo', 'https://other.example']
        ];
        var tests = [
            ['http://domain.example/foo',      'https://other.example/'],
            ['http://domain.example/foo/',     'https://other.example/'],
            ['http://domain.example/foo/moo',  'https://other.example/moo'],
            ['http://domain.example/foo/moo/', 'https://other.example/moo/'],
            ['http://domain.example/fooo',     null],
            ['http://domain.example:8080/foo', 'https://other.example/'],
            ['https://domain.example/foo',     'https://other.example/']
        ];

        runTests(rules, tests);
    });

    describe('Rule: /foo -> https://other.example/', function() {
        var rules = [
            ['/foo', 'https://other.example/']
        ];
        var tests = [
            ['http://domain.example/foo',      'https://other.example/'],
            ['http://domain.example/foo/',     'https://other.example/'],
            ['http://domain.example/foo/moo',  'https://other.example/moo'],
            ['http://domain.example/foo/moo/', 'https://other.example/moo/'],
            ['http://domain.example/fooo',     null],
            ['http://domain.example:8080/foo', 'https://other.example/'],
            ['https://domain.example/foo',     'https://other.example/']
        ];

        runTests(rules, tests);
    });

    describe('Rule: /foo/ -> https://other.example', function() {
        var rules = [
            ['/foo/', 'https://other.example']
        ];
        var tests = [
            ['http://domain.example/foo',      'https://other.example/'],
            ['http://domain.example/foo/',     'https://other.example/'],
            ['http://domain.example/foo/moo',  'https://other.example/moo'],
            ['http://domain.example/foo/moo/', 'https://other.example/moo/'],
            ['http://domain.example/fooo',     null],
            ['http://domain.example:8080/foo', 'https://other.example/'],
            ['https://domain.example/foo',     'https://other.example/']
        ];

        runTests(rules, tests);
    });

    describe('Rule: /foo/ -> https://other.example/', function() {
        var rules = [
            ['/foo/', 'https://other.example/']
        ];
        var tests = [
            ['http://domain.example/foo',      'https://other.example/'],
            ['http://domain.example/foo/',     'https://other.example/'],
            ['http://domain.example/foo/moo',  'https://other.example/moo'],
            ['http://domain.example/foo/moo/', 'https://other.example/moo/'],
            ['http://domain.example/fooo',     null],
            ['http://domain.example:8080/foo', 'https://other.example/'],
            ['https://domain.example/foo',     'https://other.example/']
        ];

        runTests(rules, tests);
    });
});
