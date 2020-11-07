const express = require('express');
const socket  = require('socket.io');

const App = express();

const PORT = 5050;

const Server = App.listen(PORT, ()=>{
	console.log(`[LISTENING] Listening on Port ${PORT}`);
});

App.use(express.static('public'));
//Socket setup

var io = socket(Server);


io.on('connection', (socket)=>{
	console.log(`A NEW CONNECTION ${socket.id}`);


	socket.on('chat', (data)=>{
		io.sockets.emit('chat', data);
	});
	socket.on('typing', (data)=>{
		socket.broadcast.emit('typing', data);
	});
});