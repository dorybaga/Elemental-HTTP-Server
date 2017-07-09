/*jshint esversion: 6 */
const http = require('http');
const fs = require('fs');

// Objectives
  // Receive the request
  // Respond to the request
  // End connection

const server = http.createServer((req, res) => {

  const index = fs.readFileSync('public/index.html', 'utf8', () =>{
  });

  const hydrogen = fs.readFileSync('public/hydrogen.html', 'utf8', () =>{

  });

  const helium = fs.readFileSync('public/helium.html', 'utf8', () =>{

  });

  const err = fs.readFileSync('public/404.html', 'utf8', () =>{

  });

  const css = fs.readFileSync('public/css/styles.css', 'utf8', () =>{

  });

  // console.log(req.rawHeaders);
  res.writeHead(200, {
    'Content-Type': "text/plain",
    'Date': 'Wed, 08 Jul 2015 22:31:15 GMT',
    'Context-Length': '404',
    'Connection': 'keep-alive\n',

});

  res.write('sending data', 'utf8', () => {
  res.end();
  });

});

server.listen(8080, () => {
  console.log('server sprinting on port 8080');
});

