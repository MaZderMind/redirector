Universal HTTP Redirector
=========================

Configure via Environment:
```
docker run -p 8080:8080 -redirect_00_some_other_name="/foo:/bar" -e redirect_01_some_name="/:http://www.foo.de/" mazdermind:redirector:latest
```

All Env-Variables startign with `redirect` are considered and sorted by name. For each request each rule is tested for a prefix-match. If the Rule is a prefix of the incoming URL a redirect is performed. If the target does not specify a protocol or host, the requests' protocol and host is substituted.
