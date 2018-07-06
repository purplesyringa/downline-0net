import {zeroPage} from "../zero";

export async function safeSend(message, ip, to) {
	const reply = await zeroPage.cmd("peerSend", {
		ip, to,
		message,
		privatekey: "stored"
	});

	return reply.message;
}