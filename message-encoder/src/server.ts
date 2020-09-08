import * as net from 'net'; // https://nodejs.org/api/net.html

// server config
const server = net.createServer();
const PORT: number = 3000;
const HOST: string = '127.0.0.1';

// ...
server.on('connection', (socket) => {
	const { remoteAddress, remotePort } = socket;

	console.log(`new connection from ${remoteAddress}:${remotePort}`);

	// when data is received
	socket.on('data', (buffer) => {
		const request: string = buffer.toString();

		// ...
		if (request == 'delay') {
			setTimeout(() => {
				socket.write(`HTTP/1.1 200 OK\r\n\r\n${request}`);
			}, 5000);
		}
		// ...
		else if (request == 'stop') {
			const message: string = 'closing server';
			socket.write(`HTTP/1.1 200 OK\r\n\r\n${message}`);
			socket.end();
			console.warn(`Socket closed from ${remoteAddress}:${remotePort}`);
		} else {
			socket.write(`HTTP/1.1 200 OK\r\n\r\n${request}`);
		}
	});
});

// ...
server.listen(PORT, HOST, () => console.log(`Server running @ ${HOST}:${PORT}`));
