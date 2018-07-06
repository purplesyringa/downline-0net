import {zeroPage} from "../../zero";
import DLTPInsecureHandler from "./handler/insecure";

export default class Connection {
	constructor(bcAddress, ip) {
		this.bcAddress = bcAddress;
		this.ip = ip;
		this.handler = null;
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
			throw new Error("Not implemented");
		} else if(features.indexOf("insecure") > -1) {
			this.log("Trying to connect via 'insecure'...");
			this.handler = new DLTPInsecureHandler(this.bcAddress, this.ip);
			await this.handler.open();
		} else {
			this.log("Neither 'securev1' nor 'insecure' are supported.");
			throw new Error("No supported protocols");
		}
	}


	async send(message) {
		if(!this.handler) {
			throw new Error("No handler: connection is not opened");
		}

		return await this.handler.send(message);
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