import {zeroPage} from "../../../zero";
import {encode, decode, encrypt, decrypt} from "../util";
import crypto from "crypto";
import eccrypto from "eccrypto";


export default class DLTPSecureV1Handler {
	constructor(bcAddress, ip) {
		this.bcAddress = bcAddress;
		this.ip = ip;
	}

	async open() {
		this.clientPrivateKey = crypto.randomBytes(32);
		this.clientPublicKey = eccrypto.getPublic(this.clientPrivateKey);

		this.connectionId = await this._safeSend(`dltp:open:securev1:${this.clientPublicKey.toString("base64")}`);
		this.serverPublicKey = decode(await this._safeSend(`dltp:connection:${this.connectionId}:getServerPublicKey`));

		this.log(`Opened securev1 connection (${this.serverPublicKey.toString("base64").slice(0, 16)} / ${this.clientPublicKey.toString("base64").slice(0, 16)})`);
		this.opened = true;
	}

	async send(message) {
		if(!this.opened) {
			throw new Error("Connection is not opened");
		}

		this.log("Send", message);

		const msg = `dltp:connection:${this.connectionId}:message:${await encrypt(message, this.serverPublicKey)}`;
		const recv = decrypt(await this._safeSend(msg), this.clientPrivateKey);
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
			console.log("[dltp]", "[securev1]", ...args);
		} else {
			console.log("[dltp]", `[securev1 ${this.connectionId}]`, ...args);
		}
	}
};