import DLTPServer from "./dltp/server";
import {zeroPage, zeroFS} from "./dltp/zero";

let cache = null;

async function getPrivate() {
	let ls = await zeroPage.cmd("wrapperGetLocalStorage");
	if(!ls) {
		ls = {};
	}
	if(!ls.private) {
		ls.private = Math.random().toString(36).substr(2);
		await zeroPage.cmd("wrapperSetLocalStorage", ls);
	}
	return ls.private;
}

const dltp = new DLTPServer(async req => {
	if(req.startsWith("resolve:")) {
		const host = req.replace("resolve:", "");
		if(!cache) {
			const path = `data/${await getPrivate()}/sites.json`;
			cache = JSON.parse(await zeroFS.readFile(path));
		}
		return cache[host] || false;
	} else {
		throw new Error(`Unknown InterNIC command ${req}`);
	}
});