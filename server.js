/*jshint esversion: 6 */
const http = require('http');
const fs = require('fs');
var html = fs.readFileSync('public/index.html');
var date = new Date().toUTCString();

const server = http.createServer((req, res) => {

//handle the routes
if (req.method === 'POST') {
  //pipe the request data to the console
  req.pipe(process.stdout);
  res.writeHead(200, {'Content-Type': "text/plain"});
  req.pipe(res);

  } else {
    //for GET requests, serve up the contents in 'index.html'
    res.writeHead(200, {'Content-Type': "text/html"});
    res.write(html);
    res.end();
  }

});

server.listen(8080, () => {
  console.log('server sprinting on port 8080');
});

