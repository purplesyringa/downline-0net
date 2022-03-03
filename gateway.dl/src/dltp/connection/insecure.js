import {zeroPage} from "../zero";
import {safeSend, decode, encode} from "../util";

class DLTPInsecureConnection {
	constructor(hash, ip, id, handler) {
		this.hash = hash;
		this.ip = ip;
		this.id = id;
		this.handler = handler;

		this.handshake();
	}

	async handshake() {
		await safeSend(this.id, this.ip, this.hash);
	}

	async _recv(data, hash) {
		if(data.startsWith("message:")) {
			const message = decode(data.replace("message:", ""));
			let response;
			try {
				response = await this.handler(message, this);
				zeroPage.cmd("peerValid", [hash]);
				await safeSend(encode(response), this.ip, hash);
			} catch(e) {
				this.log("Error", e);
				zeroPage.cmd("peerInvalid", [hash]);
			}
		} else {
			this.log("Unknown command", data);
			zeroPage.cmd("peerInvalid", [hash]);
		}
	}

	log(...args) {
		console.log("[dltp]", `[connection #${this.id}]`, "[insecure]", ...args);
	}
};


export default DLTPInsecureConnection;