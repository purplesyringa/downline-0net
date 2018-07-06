import {zeroPage} from "../../zero";
import {safeSend, decode, encode, encrypt, decrypt} from "../util";
import crypto from "crypto";
import eccrypto from "eccrypto";

class DLTPSecureV1Connection {
	constructor(hash, ip, id, clientPublicKey, handler) {
		this.hash = hash;
		this.ip = ip;
		this.id = id;
		this.handler = handler;
		this.clientPublicKey = clientPublicKey;

		this.handshake();
	}

	async handshake() {
		this.serverPrivateKey = crypto.randomBytes(32);
		this.serverPublicKey = eccrypto.getPublic(this.serverPrivateKey);

		safeSend(this.id, this.ip, this.hash);

		this.log(`Opened connection (${this.serverPublicKey.toString("base64").slice(0, 16)} / ${this.clientPublicKey.toString("base64").slice(0, 16)})`);
	}



	async _recv(data, hash) {
		if(data === "getServerPublicKey") {
			this.log("Public key request");
			await safeSend(encode(this.serverPublicKey), this.ip, hash);
			zeroPage.cmd("peerValid", [hash]);
		} else if(data.startsWith("message:")) {
			const message = await decrypt(data.replace("message:", ""), this.serverPrivateKey);
			console.log(message);

			let response;
			try {
				response = await this.handler(message);
				zeroPage.cmd("peerValid", [hash]);

				await safeSend(await encrypt(response, this.clientPublicKey), this.ip, hash);
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
		console.log("[dltp]", `[connection #${this.id}]`, "[securev1]", ...args);
	}
};


export default DLTPSecureV1Connection;