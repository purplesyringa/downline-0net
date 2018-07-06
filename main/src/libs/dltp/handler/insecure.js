import {zeroPage} from "../../../zero";
import {encode, decode} from "../util";


export default class DLTPInsecureHandler {
	constructor(bcAddress, ip) {
		this.bcAddress = bcAddress;
		this.ip = ip;
	}

	async open() {
		const connectionId = await this._safeSend("dltp:open:insecure");
		this.connectionId = connectionId;

		this.log("Opened insecure connection");
		this.opened = true;
	}

	async send(message) {
		if(!this.opened) {
			throw new Error("Connection is not opened");
		}

		this.log("Send", message);

		const msg = `dltp:connection:${this.connectionId}:message:${encode(message)}`;
		const recv = decode(await this._safeSend(msg));
		return recv;
	}



	async _safeSend(message) {
		const reply = await zeroPage.cmd("as", [this.bcAddress, "peerSend", {
			ip: this.ip,
			message
		}]);

		if(reply.signed_by != this.bcAddress) {
			throw new Error(`Invalid signature: got '${reply.signed_by}', expected '${this.bcAddress}'`);
		}

		return reply.message;
	}

	log(...args) {
		if(this.connectionId === null) {
			console.log("[dltp]", "[insecure]", ...args);
		} else {
			console.log("[dltp]", `[insecure ${this.connectionId}]`, ...args);
		}
	}
};