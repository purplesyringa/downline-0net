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
	}


	_recv(message) {
		if(!message.message.startsWith("dltp:")) {
			this.log(`Non-dltp message from ${message.ip}`);
			zeroPage.cmd("peerInvalid", [message.hash]);
			return;
		}

		this.log(`Message from ${message.ip}:`, message.message);

		if(message.message == "dltp:features") {
			safeSend("dltp:featureList:" + [
				"insecure"
			].join(";"), message.ip, message.hash);
		} else if(message.message == "dltp:open:insecure") {
			new DLTPInsecureConnection(message.hash, message.ip, this.lastId++);
		}
	}


	log(...args) {
		console.log("[dltp]", "[server]", ...args);
	}
};
DLTPServer.servers = [];


export default DLTPServer;