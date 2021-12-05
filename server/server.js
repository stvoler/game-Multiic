// Nodejs test server for Multiic
var version = "0.1";
var port = 8081;

// Initialization
var server = require("http");
server = server.createServer(Handler);
var io = require("socket.io").listen(server); 
io = io.sockets.on("connection", SocketHandler);
var fs = require("fs");
var path = require("path");
var logger = require('util');
var sys = require('sys');
server.listen(port);

console.log("Server Multiic");
console.log("Version: "+version);
console.log("===================================");
logger.log("Started server on port "+port);

//PlayerSync();

// Socket handler
function SocketHandler(socket, data) {
    var ip = socket.handshake.address;
    logger.log("Incoming connection from "+ip.address+":"+ip.port);
}

function Handler(req, res)
{                     
//console.log("REQUEST: "+req.url);
    var file = ".." + req.url;
    if(file === "../") {
	file = "../index.html";
    }
    var name = path.extname(file);
    var contentType;
    switch(name) {
    case '.html':
    case '.htm':
	contentType = 'text/html';
	break;
    case '.js':
	contentType = 'text/javascript';
	break;
    case '.css':
	contentType = 'text/css';
	break;
    case '.png':
	contentType = 'image/png';
	break;
    case '.jpg':
	contentType = 'image/jpg';
	break;
    }
    var headers = {};
    if (contentType)
      headers['Content-Type'] = contentType;

    fs.exists(file, function(exists) {
	if(exists) {
	    fs.readFile(file,function(err,data) {
		res.writeHead(200, headers);
		res.end(data);
	    });
	} else {
	    res.writeHead(404, headers);
	    res.end("R.I.P "+file);
	}
    });
}