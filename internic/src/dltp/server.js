import {zeroPage} from "../zero";
import DLTPInsecureConnection from "./connection/insecure";
import {safeSend} from "./util";

zeroPage.on("peerReceive", message => {
	DLTPServer.servers.forEach(server => server._recv(message.params));
});


class DLTPServer {
	constructor(handler) {
		DLTPServer.servers.push(this);
		this.log("DLTP server is listening");
		this.handler = handler;
		this.lastId = 0;
		this.connections = {};
	}


	_recv(message) {
		if(!message.message.startsWith("dltp:")) {
			this.log(`Non-dltp message from ${message.ip}`);
			zeroPage.cmd("peerInvalid", [message.hash]);
			return;
		}

		this.log(`Message from ${message.ip}:`, message.message);

		if(message.message === "dltp:features") {
			safeSend("dltp:featureList:" + [
				"insecure"
			].join(";"), message.ip, message.hash);
			zeroPage.cmd("peerValid", [message.hash]);
		} else if(message.message === "dltp:open:insecure") {
			const id = this.lastId++;
			this.connections[`${message.ip}:${id}`] = new DLTPInsecureConnection(message.hash, message.ip, id, this.handler);
			zeroPage.cmd("peerValid", [message.hash]);
		} else if(message.message.startsWith("dltp:connection:")) {
			const msg = message.message.replace("dltp:connection:", "");
			const id = msg.substr(0, msg.indexOf(":"));
			if(!this.connections[`${message.ip}:${id}`]) {
				this.log("Unknown connection", `${message.ip}:${id}`);
				zeroPage.cmd("peerInvalid", [message.hash]);
			} else {
				const data = msg.substr(msg.indexOf(":") + 1);
				this.connections[`${message.ip}:${id}`]._recv(data, message.hash);
			}
		} else {
			this.log("Unknown message", message.message);
			zeroPage.cmd("peerInvalid", [message.hash]);
		}
	}


	log(...args) {
		console.log("[dltp]", "[server]", ...args);
	}
};
DLTPServer.servers = [];


export default DLTPServer;