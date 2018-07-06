import DLTPServer from "./dltp/server";
import {zeroFS} from "./zero";

let cache = null;

const dltp = new DLTPServer(async req => {
	if(req.startsWith("resolve:")) {
		const host = req.replace("resolve:", "");
		if(!cache) {
			cache = JSON.parse(await zeroFS.readFile("data/sites.json"));
		}
		return cache[host] || false;
	} else {
		throw new Error(`Unknown InterNIC command ${req}`);
	}
});