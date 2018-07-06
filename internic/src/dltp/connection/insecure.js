import {zeroPage} from "../../zero";
import {safeSend} from "../util";
import crypto from "crypto";
import eccrypto from "eccrypto";

class DLTPConnection {
	constructor(hash, ip, id) {
		this.hash = hash;
		this.ip = ip;
		this.id = id;

		this.handshake();
	}

	handshake() {
		safeSend(this.id, this.ip, this.hash);
	}

	log(...args) {
		console.log("[dltp]", `[connection #${this.id}]`, ...args);
	}
};


export default DLTPConnection;