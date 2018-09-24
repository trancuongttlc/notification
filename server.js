'use strict';

var fs = require('fs');
// var privateKey  = fs.readFileSync('/root/.acme.sh/academy.ceosoftware.vn/academy.ceosoftware.vn.key', 'utf8');
// var certificate = fs.readFileSync('/root/.acme.sh/academy.ceosoftware.vn/academy.ceosoftware.vn.cer', 'utf8');
// var credentials = {key: privateKey, cert: certificate};

var port        = process.env.PORT || 1603;
var path        = require('path');
var events      = require('./event');

var express = require('express'),
    app     = express(),
    // server  = require('https').createServer(credentials, app),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server),
    request = require('request');
    app.use(express.static('src'));
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/src/index.html'));
    });

io.on('connection', function(socket) {
    events.events(socket, io.sockets);
});

server.listen(port, function(err, connect) {
    if(err) throw err;
    console.log('App listening to '+port+' ...');
});