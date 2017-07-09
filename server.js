/*jshint esversion: 6 */
const http = require('http');
const fs = require('fs');
var index = fs.readFileSync('public/index.html');
var error = fs.readFileSync('public/404.html');
var helium = fs.readFileSync('public/helium.html');
var hydrogen = fs.readFileSync('public/hydrogen.html');
var styles = fs.readFileSync('public/css/styles.css');
var date = new Date().toUTCString();

//userInput object is place holder for future POSTs from users
var userInput = {
  elementName: 'elementName',
  elementSymbol: 'elementSymbol',
  elementAtomicNumber: 'elementAtomicNumber',
  elementDescription: 'elementDescription'
};

//function to handle POST data form users
function parseData(name, symbol, number, description){
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${name}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${name}</h1>
  <h2>${symbol}</h2>
  <h3>Atomic number ${number}</h3>
  <p>${description}</p>
  <p><a href="/">back</a></p>
</body>
</html>`;
}
console.log(parseData('Josh', 'J', 275, 'is a terrible speller'));
var josh = parseData('Josh', 'J', 275, 'is a terrible speller');
const test = fs.createWriteStream('josh.html', { flags : 'w' });

const server = http.createServer((req, res) => {
  console.log('this is the shit we are lookinf for',req.headers);
//handle the routes
  if (req.method === 'POST') {
    //pipe the request data to the console
    req.pipe(process.stdout);
    res.writeHead(200, {'Content-Type': "text/plain"});
    req.pipe(res);

  } else {
    //for GET requests, serve up the contents in the public folder

    //this is the given method to target the path that is being passed through our switch stament
    var uri = req.url;

    switch (uri) {

    case '/':
      res.writeHead(200, {'Content-Type': "text/html"});
      res.write(index);
      res.end();
      break;

    case '/index.html':
      res.writeHead(200, {'Content-Type': "text/html"});
      res.write(index);
      res.end();
      break;

    case '/hydrogen.html':
      res.writeHead(200, {'Content-Type': "text/html"});
      res.write(hydrogen);
      res.end();
      break;

    case '/helium.html':
      res.writeHead(200, {'Content-Type': "text/html"});
      res.write(helium);
      res.end();
      break;

    case '/404.html':
      res.writeHead(404, {'Content-Type': "text/html"});
      res.write(error);
      res.end();
      break;

    case '/css/styles.css':
      res.writeHead(200, {'Content-Type': "text/css"});
      res.write(styles);
      res.end();
      break;

    default :
      res.writeHead(404, {'Content-Type': "text/html"});
      res.write(error);
      res.end();
      break;
    }
  }
});

server.listen(8080, () => {
  console.log('server sprinting on port 8080');
});

