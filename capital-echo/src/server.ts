import * as udp from 'dgram'; // https://nodejs.org/api/dgram.html
import base64 from 'base-64';
import fs from 'fs';

// ...
const server = udp.createSocket('udp4');
const PORT: number = 4000;

// ...
server.on('error', (err) => {
	console.error(`server error: ${err.stack}`);
	server.close();
});

const sections = [];

/// Image Receiver
// server.on('message', (buffer, rinfo) => {
// 	const msg = buffer.toString();
// 	const split = msg.split(';');
// 	const id = split[0];

// 	console.log('id', id);

// 	sections.push(split);
// 	console.log(sections.length);

// console.log(`server got: image from ${rinfo.address}:${rinfo.port}`);

// const imageBuffer = new Buffer(msg, 'base64');
// fs.writeFileSync('./server-image.jpg', imageBuffer);
// console.log('IMAGE SIZE:', buffer.toString().length);
//process.exit();

// console.log(buffer.toString());

// const message_capitalized: string = msg.toLocaleUpperCase();
// server.send(id, rinfo.port, rinfo.address);
// server.close()
// });

// Message Capitalizer
server.on('message', (buffer, rinfo) => {
	const msg = buffer.toString();
	console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

	const message_capitalized: string = msg.toUpperCase();
	server.send(message_capitalized, rinfo.port, rinfo.address);
});

// ...
server.on('listening', () => {
	const address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

// ...
server.bind(PORT);
