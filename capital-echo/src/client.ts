import * as udp from 'dgram'; // https://nodejs.org/api/dgram.html

// ...
const client = udp.createSocket('udp4');
const PORT: number = 4000;

// ...
client.send(['test'], PORT, 'localhost', (error) => {
	if (error) client.close();
	else console.log('Data sent !!!');
});

// ...
client.on('message', (msg, rinfo) => {
	console.log('Data received from server : ' + msg.toString());
});
