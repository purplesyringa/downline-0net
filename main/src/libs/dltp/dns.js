import {zeroPage} from "../../zero";
import DLTPConnection from "./connection";

let cache = {};

export async function resolve(host) {
	if(cache[host]) {
		return cache[host];
	}

	if(host === "internic") {
		const siteInfo = await zeroPage.getSiteInfo();
		return cache[host] = siteInfo.content.config.internic;
	}

	const {bcAddress: internicBcAddress, ip: internicIP} = await resolve("internic");
	const internicCon = new DLTPConnection(internicBcAddress, internicIP);
	await internicCon.open();

	cache[host] = await internicCon.send(`resolve:${host}`);
	return cache[host];
}