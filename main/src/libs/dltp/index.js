import DLTPConnection from "./connection";
import {resolve} from "./dns";

export async function connect(host) {
	const {bcAddress, ip} = await resolve(host);
	const con = new DLTPConnection(bcAddress, ip);
	await con.open();
	return con;
}