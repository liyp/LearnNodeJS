const http = require('http');
const querystring = require('querystring');

http.createServer(function (request, response) {
    console.log('# request:');
    console.log(request.method);
    console.log(request.headers);

    var body = [];
    request.on('data', function (chunk) {
        body.push(chunk);
    });

    request.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
}).listen(8080);

http.get('http://localhost:8080', function (response) {
    console.log('# response:')
});
http.get('http://localhost:8080', function (response) {
    console.log('# response:')
});

var postData = querystring.stringify({
    'msg': 'Hello World!'
});

var options = {
    hostname: 'localhost',
    port: 8080,
    path: '',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();