var webSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {

});

server.listen('5000', function (event) {
  console.log('Server is listening on 5000....', event);
});

var wsServer = new webSocketServer({httpServer: server});

wsServer.on('request', function (request) {
  var connection = request.accept(null, request.origin);
  connection.on('message', function (message) {
    console.log('Message received ', message);
    connection.sendUTF(message.utf8Data);

  });
  connection.on('close', function (connection) {
    console.log('Connection closed ', connection);
  });
})

