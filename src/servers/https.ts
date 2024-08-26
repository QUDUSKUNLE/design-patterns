import { createServer } from 'http';
import { readFile, createReadStream } from 'fs'
import path from 'path'
import url from 'url'

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  switch (req.url) {
    case '/':
      res.writeHead(200);
      res.end(`You are welcome.\n`)
      break;
    case '/upload':
      const uRL = url.parse(req.url)
      readFile(path.join(__dirname, 'file.html'), (err, data) => {
        if (err) {
          res.writeHead(400,  {'Content-Type': 'text/html'})
          res.end('Not Found')
        }
        res.writeHead(200, {'Content-Type': 'text/html'})
        let read = createReadStream(path.join(__dirname, 'file.html'))
        read.on('open', () => console.log("The file is opened"))
        res.write(data)
        res.end()
      })
      break;
    default:
      res.writeHead(404)
      res.end(JSON.stringify({ error: 'Resource not found' }));
  }
})

server.listen(2000, '127.0.0.1', () => console.log('listening on port 2000'))
