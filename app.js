var express = require('express');
var app = express();
var port = 3700;

// sets where template files are
app.set('views', __dirname + '/templates');

// .pug (jade) view setup - need to install pug
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);

// .html view setup - need to install ejs
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
	res.render('index');
});

// where .js file with front-end logic are
app.use(express.static(__dirname + '/public'));

// it pass the ExpressJS server to Socket.io (real time communication)
var io = require('socket.io').listen(app.listen(port));

// the parameter is the client socket
io.sockets.on('connection', function(socket) {
	
	// send a 'welcome message' when successful connection is made
	socket.emit('message', { message: 'Welcome to nolo chat' });

	// bind a handler (used as a receiver)
	socket.on('send', function(data) {
		io.sockets.emit('message', data);
	});
});

console.log('Listening on port ' + port);