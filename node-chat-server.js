var webSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {});

server.listen('5000', function () {
  console.log('Server is listening on 5000....');
});

var users = [];
var userCount = 0;
var wsServer = new webSocketServer({httpServer: server});

wsServer.on('request', function (request) {
  var connection = request.accept(null, request.origin);
  users[userCount] = {
    id: 'user_' + (userCount+1),
    connObject: connection,

  };
  connection.sendUTF(JSON.stringify({toUser: users[userCount].id, type: 'greet', message: 'Hello moto..'}));
  userCount++;

  connection.on('message', function (message) {
    console.log('Message received ', message);
    var msg = JSON.parse(message.utf8Data);
    for(var i = 0 ; i < users.length ; i++ ){
      if(users[i].id != msg['fromUser'])
        users[i].connObject.sendUTF(message.utf8Data);
    }
  });
  connection.on('close', function (connection) {
    console.log('Connection closed ', connection);
  });
})

