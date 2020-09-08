import * as udp from 'dgram'; // https://nodejs.org/api/dgram.html
import base64 from 'base-64';
import fs from 'fs';

// ...
const client = udp.createSocket('udp4');
const PORT: number = 4000;
const STEP: number = 10;
// ...

client.on('connect', () => {
	client.setSendBufferSize(1660000);
});
let sections: string[] = [];

client.send('hello world', PORT, 'localhost', (error) => {
	if (error) client.close();
	else console.log('Data sent !!!');
});

// ...
client.on('message', (buffer, rinfo) => {
	console.log('Data received from server : ' + buffer.toString());
});

client.on('error', (error) => console.error(error));

// second part of project
async function run() {
	const img: string = fs.readFileSync('./donald.jpg', { encoding: 'base64' });

	const imgLength = img.length;

	let count = 0;
	for (let index = 0; index <= imgLength; index += STEP) {
		let upper = index + STEP;
		if (upper > img.length) upper = img.length;

		const section = img.substr(index, index + STEP);

		sections.push(`${count++};${section}`);
	}

	console.log('N SECTIONS:', sections.length);

	createClientAndStart();
}

function createClientAndStart() {
	client.connect(PORT, 'localhost', () => {
		handleSend(sections);
	});
}

async function handleSend(sections: string[]) {
	const section: string | undefined = sections.shift();
	if (section !== undefined) {
		client.send(section, async (error) => {
			if (error) {
				console.log(error);
				await timeout(1000);
				client.disconnect();
				createClientAndStart();
				// client.close();
			} else handleSend(sections);
			// handleSend(sections);
		});
	}
}

function timeout(ms: any) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// run();
