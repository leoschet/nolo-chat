window.onload = function() {
	// store ALL messages
	var messages = [];
	
	// communication socket
	var socket = io.connect('http://localhost:3700');

	// DOM elements
	var field = document.getElementById('field');
	var sendBtn = document.getElementById('send');
	var content = document.getElementById('content');

	// on event 'message' do: receive data with property message
	socket.on('message', function(data){
		if(data.message) {
			// add message to storage
			messages.push(data.message);
			var html = '';

			// recreate div#content
			for (var i = 0; i < messages.length; i++) {
				html += messages[i] + '<br />';
			}

			content.innerHTML = html;
		} else {
			console.log('There is a problem: ', data);
		}
	});

	sendBtn.onclick = function() {
		// get the message text
		var text = field.value;

		// send the message
		socket.emit('send', { message: text })

		// clean field value and focus it
		field.value = '';
		field.focus();
	};
}