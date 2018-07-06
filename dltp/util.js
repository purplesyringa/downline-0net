import {zeroPage} from "./zero";
import eccrypto from "eccrypto";

export async function safeSend(message, ip, to) {
	const reply = await zeroPage.cmd("peerSend", {
		ip, to,
		message,
		privatekey: "stored"
	});

	return reply.message;
}


export function encode(value) {
	if(value instanceof Buffer) {
		return `buffer:${Buffer.from(value, "utf8").toString("base64")}`;
	} else if(["number", "boolean", "undefined"].indexOf(typeof value) > -1 || value === null) {
		return `${value === null ? "null" : typeof value}:${value}`;
	} else {
		return `object:${JSON.stringify(value)}`;
	}
}

export function decode(value) {
	const type = value.substr(0, value.indexOf(":"));
	value = value.substr(value.indexOf(":") + 1);

	if(type === "number") {
		return Number(value);
	} else if(type === "boolean") {
		return value === "true";
	} else if(type === "undefined") {
		return undefined;
	} else if(type === "string") {
		return Buffer.from(value, "base64").toString("utf8");
	} else if(type === "null") {
		return null;
	} else if(type === "object") {
		return JSON.parse(value);
	} else {
		return Buffer.from(value, "base64");
	}
}


export async function encrypt(value, publicKey) {
	const encrypted = await eccrypto.encrypt(publicKey, Buffer.from(encode(value), "utf8"));

	const ciphertext = encrypted.ciphertext.toString("base64");
	const ephemPublicKey = encrypted.ephemPublicKey.toString("base64");
	const iv = encrypted.iv.toString("base64");
	const mac = encrypted.mac.toString("base64");

	return `${ciphertext}:${ephemPublicKey}:${iv}:${mac}`;
}

export async function decrypt(value, privateKey) {
	let [ciphertext, ephemPublicKey, iv, mac] = value.split(":");
	ciphertext = Buffer.from(ciphertext, "base64");
	ephemPublicKey = Buffer.from(ephemPublicKey, "base64");
	iv = Buffer.from(iv, "base64");
	mac = Buffer.from(mac, "base64");

	const decrypted = await eccrypto.decrypt(privateKey, {
		ciphertext,
		ephemPublicKey,
		iv,
		mac
	});
	return decode(decrypted.toString("utf8"));
}