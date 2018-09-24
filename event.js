module.exports.events = function(socket, chat) { 

	socket.on('notification', function(data) {
	    socket.emit("show-notification", data)
	})

	socket.on('disconnect', function(e) {
	    console.log(e, 'Got disconnect!');
	});
}