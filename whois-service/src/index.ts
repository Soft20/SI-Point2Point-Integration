import readline from 'readline'; // https://nodejs.org/api/readline.html
import yargs from 'yargs';
const whois = require('whois');

// input config
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const FALLBACK_PORT: number = 43;
const FALLBACK_HOST: string = 'whois.dk-hostmaster.dk';

const args = yargs.options({
	host: { type: 'string', demandOption: false, alias: 'h' },
	port: { type: 'number', demandOption: false, alias: 'p' },
}).argv;

if (!args.host) console.warn(`Host value missing, using fallback value: ${FALLBACK_HOST}`);
if (!args.port) console.warn(`Port value missing, using fallback value: ${FALLBACK_PORT}`);

const HOST: string = args.host || FALLBACK_HOST;
const PORT: number = args.port || FALLBACK_PORT;

function lookupPrompt() {
	rl.question('Send the host\nHost:: ', (data: string) => {
		whois.lookup(
			data,
			{
				server: `${HOST}:${PORT}`,
			},
			function (err: any, data: any) {
				console.log(data);
				lookupPrompt();
			}
		);
	});
}

lookupPrompt();
