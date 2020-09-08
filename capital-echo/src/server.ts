import * as udp from 'dgram'; // https://nodejs.org/api/dgram.html

// ...
const server = udp.createSocket('udp4');
const PORT: number = 4000;

// ...
server.on('error', (err) => {
	console.error(`server error: ${err.stack}`);
	server.close();
});

// ...
server.on('message', (msg, rinfo) => {
	console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

	const message_capitalized: string = msg.toString().toUpperCase();
	server.send(message_capitalized, rinfo.port, rinfo.address);
});

// ...
server.on('listening', () => {
	const address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

// ...
server.bind(PORT);
