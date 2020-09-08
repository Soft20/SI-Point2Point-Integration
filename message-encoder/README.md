# Project 2: Message Encoder
[goto root](../README.md)

This project illustrates control over the communication and exchange of text messages between a client and a server using TCP protocol over Sockets and endpoints.

Server opens a server socket on a specified port and starts listening on it. When the socket detects an incoming connection, it will accept it and create a new `Socket` instance to facilitate the communication to the client, sending the request.

_[extended information](https://datsoftlyngby.github.io/soft2020fall/resources/ec16b918-P2-TCP.html)_

### Objectives
- [x] Server opens one of its ports, preferably with a number > `1024`, for example `6666`, and creates a socket for it
- [x] Server declares that is ready to listen and accept requests
- [x] If a message from a Client comes on this port, Server processes it, by reverting the text.
- [x] Server keeps listening, until a `stop` command comes from the Client

#### Homework Task
In the reality, servers often have to serve multiple clients at the same time.

- [x] Modify the program above, so then server would be able to listen to more than one clients in parallel, running multiple threads.

### Source
* [server.ts](src/server.ts)
* [client.ts](src/client.ts)

### Execution


#### Server
_bash_
```bash
yarn server
```

#### Client

This script takes 2 arguments `host` and `port`.

_bash_
```bash
yarn client -h <host> -p <port>
```

_bash example_
```bash
yarn client -h 127.0.0.1 -p 3000 -d "\!false is funny because it's true - 👻"
```

### Resources
* https://itnext.io/a-web-server-from-scratch-in-typescript-854642a85402
* https://gist.github.com/tedmiston/5935757
* https://nodejs.org/api/net.html
* https://nodejs.org/api/readline.html
* https://www.npmjs.com/package/yargs