/*jshint esversion: 6 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

var index = fs.readFileSync('public/index.html');
var error = fs.readFileSync('public/404.html');
var helium = fs.readFileSync('public/helium.html');
var hydrogen = fs.readFileSync('public/hydrogen.html');
var styles = fs.readFileSync('public/css/styles.css');
var date = new Date().toUTCString();

//function to handle POST data form users
function parseData(name, symbol, number, description){
  var htmlRender = `<!DOCTYPE html>
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
return htmlRender;
}



const server = http.createServer((req, res) => {

//handle the routes
  if (req.method === 'POST') {
    //pipe the request data to the console
    req.pipe(process.stdout);
    res.writeHead(200, {'Content-Type': "text/plain"});
    req.pipe(res);

    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      var userData = querystring.parse(body);
      var fileName = userData.elementName;
      console.log('this is user data',userData);
      var generatedHTML = parseData(userData.elementName,userData.elementSymbol,userData.elementNumber,userData.elementDescription);
      fs.writeFile(`${userData.elementName}.html`,generatedHTML);
    });

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

