import * as readline from 'readline'; // https://nodejs.org/api/readline.html
import * as net from 'net'; // https://nodejs.org/api/net.html
import yargs from 'yargs'; // https://www.npmjs.com/package/yargs

// system arguments config
const args = yargs.options({
	host: { type: 'string', demandOption: false, alias: 'h' },
	port: { type: 'number', demandOption: false, alias: 'p' },
}).argv;

// connection config
const client: net.Socket = new net.Socket();
const HOST = args.host || '127.0.0.1';
const PORT = args.port || 3000;

// input config
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// missing inputs notice
if (!args.host) console.warn(`Host value missing, using fallback value: ${HOST}`);
if (!args.port) console.warn(`Port value missing, using fallback value: ${PORT}`);

// connects to host and port from system args, uses a fallback value if empty
client.connect(PORT, HOST, () => {
	console.log(`Connected to ${HOST} @ port ${PORT}`);

	// prompts client to send message or "stop" to close the socket
	rl.question('Send a message or "stop" to close connection\nRequest:: ', (data: string) => {
		client.write(data);
	});

	// when data is received
	client.on('data', (data) => {
		const response: string = data.toString();
		const body = getBody(response);
		console.log('Response::', body, '\n');

		// ATT: (hacki), prompts user every time new data is revived, unless its 'closing server'
		if (body != 'closing server') prompt();
	});

	// when socket closes
	client.on('close', () => {
		console.log('Connection closed');
		client.destroy();
	});
});

// when error occurs
client.on('error', () => {
	console.error(`Couldn't get connection to ${HOST}`);
	client.destroy();
	process.exit();
});

// prompts client to send new request, if input is 'stop' readline will close
const prompt = () => {
	rl.question('Request:: ', (data: string) => {
		client.write(data);
		if (data === 'stop') rl.close();
	});
};

// returns body from raw http response
const getBody = (response: string) => {
	const divider: string = '\r\n\r\n';
	const index: number = response.indexOf(divider);
	const body: string = response.slice(index + divider.length);
	return body;
};
