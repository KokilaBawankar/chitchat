var webSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {});

server.listen('5000', function () {
  console.log('Server is listening on 5000....');
});

var users = [];
var usersCount = 0;
var wsServer = new webSocketServer({httpServer: server});

wsServer.on('request', function (request) {
  var connection = request.accept(null, request.origin);
  users[usersCount] = {
    id: 'user_' + (usersCount+1),
    connObject: connection,
  };
  connection.sendUTF(JSON.stringify({to: users[usersCount].id, type: 'greet', message: 'Hello Moto..', from: 'ChitChat Bot'}));
  usersCount++;

  connection.on('message', function (message) {
    console.log('Message received ', message);
    var msg = JSON.parse(message.utf8Data);
    for(var i = 0 ; i < users.length ; i++ ){
      if(users[i].id != msg.from)
        users[i].connObject.sendUTF(message.utf8Data);
    }
  });
  connection.on('close', function (connection) {
    console.log('Connection closed ', connection);
  });
})

