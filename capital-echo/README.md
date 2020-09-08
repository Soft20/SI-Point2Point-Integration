# Capital Echo
[goto root](../README.md)

This project illustrates control over the communication and exchange of text messages between a client and a server over UDP protocol.

The client sends a text message to the server, and the server returns it back, after processing.

_[extended information](https://datsoftlyngby.github.io/soft2020fall/resources/f72fb747-P3-UDP.html)_

### Objectives
- [ ] The client sends a text message to the server, and the server returns it back, after processing.
- [ ] The processing protocol enables simple echoing after capitalization of the message letters.
- [ ] Instead, the server extracts the IP address of the client, every time it gets request.

#### Homework Task
UDP protocol provides faster transmission of messages, and therefore is a preferable for transmitting large, binary and video-streaming data.

- [ ] Modify the program above, so it can be applied for sending and receiving image data from a binary file.

#### Source
[server.ts](src/server.ts)
[client.ts](src/client.ts)

#### Resources
* https://nodejs.org/api/dgram.html
* https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb#file-udp-js-L41