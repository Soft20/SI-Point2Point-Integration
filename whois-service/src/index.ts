import * as readline from 'readline'; // https://nodejs.org/api/readline.html
import * as net from 'net';
import yargs from 'yargs';

// input config
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const FALLBACK_PORT: number = 43;
const FALLBACK_HOST: string = '193.163.102.55';

const client: net.Socket = new net.Socket();

const args = yargs.options({
	host: { type: 'string', demandOption: false, alias: 'h' },
	port: { type: 'number', demandOption: false, alias: 'p' },
}).argv;

if (!args.host) console.warn(`Host value missing, using fallback value: ${FALLBACK_HOST}`);
if (!args.port) console.warn(`Port value missing, using fallback value: ${FALLBACK_PORT}`);

const HOST: string = args.host || FALLBACK_HOST;
const PORT: number = args.port || FALLBACK_PORT;

client.connect(PORT, HOST, () => {
	console.log(`Connected to ${HOST} @ port ${PORT}`);

	// prompts client to send message or "stop" to close the socket
	rl.question('Send the host\nHost:: ', (data: string) => {
		console.log('input:: ', data);
		const res = client.write(data);
		console.log(res);
	});
});

client.on('data', (data) => {
	console.log(typeof data);
	const response: string = data.toString();
	// const body = getBody(response);
	console.log('Response::', response);
	client.destroy();
});

client.on('close', () => console.log('Connection closed'));

client.on('error', (e) => console.log('Some error:', e));

const getBody = (response: string) => {
	const divider: string = '\r\n\r\n';
	const index: number = response.indexOf(divider);
	const body: string = response.slice(index + divider.length);
	return body;
};
