#js #websockets



ws://
wss://

[[socketsbay.com]] - free

```
const websocket = new WebSocket(url);

websocket.onopen = function() {
	console.log('Websocket is connecting...')
}

websocket.onmessage = ({type, data}) => {
	if(type === 'message') {
		// do something //
	};
}
```

```
const WebSocket = require('ws');

const wss = new WebSocket.Server({
	port: 8080
});

wss.broadcast = function(data, clientValidator = () => true) {
	this.clients.forEach(client => {
		if(clientValidator(client)) {
			client.send(data);
		}
	});
}

wss.on("connection", ws => {
	// event will be called when client sends msg
	ws.on('message', msg => {
		// Send message to all except author
		wss.broadcast(msg, client => client !== ws);
	});
});
```

