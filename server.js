var express = require('express');
var socket = require('socket.io');

var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

const port = 5000
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

if (process.env.NODE_ENV === 'production') {
    var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
    var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
    server = app.listen(server_port, server_ip_address, function () {
        console.log('server is running on port ' + server_port)
    });
}
else {
    server = app.listen(port, function () {
        console.log('server is running on port ' + port)
    });
}

io = socket.listen(server);
var count = 0;
io.on('connection', (socket) => {

    console.log('user connesso')
    count++;
    io.emit('SOCKET_COUNTER', { count: count });

    socket.on('disconnect', function () {
        console.log('user disconnected');
        count--;
        io.emit('SOCKET_COUNTER', { count: count });
    });

    socket.on('SEND_MESSAGE', function (data) {
        io.emit('RECEIVE_MESSAGE', data);
    })

    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('CHANGE_ROOM', function (room) {
        socket.join(room)
    });

    socket.on('SEND_MESSAGE_ROOM', function (data) {
        io.in(data.room).emit('RECEIVE_MESSAGE', data);
    });

    socket.on('TYPING_MESSAGE_ROOM', function (data) {
        //io.to(data.room).emit('message',data.text);
        socket.broadcast.to(data.room).emit('TYPING_MESSAGE', data.text);
    });


    //socket.to(socket.rooms[1]).emit('message', 'what is going on, party people?');
    //redux
});