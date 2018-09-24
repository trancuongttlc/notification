module.exports.events = function(socket, chat) { 

	

	socket.on('disconnect', function() {
        console.log('Got disconnect!');
    });
}