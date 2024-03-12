let http = require('http');
let date = require('./firstModule');
let url = require('url')

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain'});
  const uRL = url.parse(req.url, true).query;
  console.log(typeof uRL);
  res.write(`Today's date is ${date.firstModule()}`)
  res.end();
}).listen(3002);
