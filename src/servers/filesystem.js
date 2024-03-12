let fs = require('fs');
let path = require('path');
let http = require('http');

http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, 'file.html'), (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html'});
      return res.end('Not Found');
    }
    res.writeHead(200, { 'Content-Type': 'text/html'});
    let read = fs.createReadStream(path.join(__dirname, 'file.html'))
    read.on('open', () => {
      console.log('The file is open');
    })
    res.write(data);
    return res.end();
  })
}).listen(3002);

