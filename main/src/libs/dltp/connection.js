import {zeroPage} from "../../zero";
import {encode, decode} from "./util";

export default class Connection {
	constructor(bcAddress, ip) {
		this.bcAddress = bcAddress;
		this.ip = ip;
		this.opened = false;
		this.connectionId = null;
	}

	async open() {
		let features = await this._safeSend("dltp:features");
		if(!features.startsWith("dltp:featureList:")) {
			this.log("Server doesn't support 'features' command");
			features = [];
		} else {
			features = features.replace("dltp:featureList:", "").split(";");
			this.log("Features supported:", features);
		}

		if(features.indexOf("securev1") > -1) {
			this.log("Trying to connect via 'securev1'...");
			await this._openSecureV1();
		} else if(features.indexOf("insecure") > -1) {
			this.log("Trying to connect via 'insecure'...");
			await this._openInsecure();
		} else {
			this.log("Neither 'securev1' nor 'insecure' are supported.");
			throw new Error("No supported protocols");
		}
	}

	async _openSecureV1() {
		throw new Error("Not implemented");
	}
	async _openInsecure() {
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
			console.log("[dltp]", "[connection]", ...args);
		} else {
			console.log("[dltp]", `[connection ${this.connectionId}]`, ...args);
		}
	}
};