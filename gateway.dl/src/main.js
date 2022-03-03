import DLTPServer from "./dltp/server";
import {zeroPage, zeroFS} from "./dltp/zero";
import crypto from "crypto";



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


function ui(path, hash) {
	if(path === "") {
		// Register
		return {
			type: "inputs",
			header: "Register",
			items: [
				["Login", "ivanq"],
				["Password", "password123"],
				["Repeat password", "password123"]
			],
			error: hash,
			submit: "Register"
		};
	}
}

async function submit(path, values) {
	if(path === "") {
		// Register
		if(!values[0]) {
			return "#No login";
		} else if(!values[1]) {
			return "#No password";
		} else if(values[1] !== values[2]) {
			return "#Passwords don't match";
		}

		// Add to user list if not added already
		const path = `data/${await getPrivate()}/userlist.json`;
		let userList = JSON.parse(await zeroFS.readFile(path));
		if(userList.indexOf(values[0]) > -1) {
			return "#Such login is already used on this gateway";
		}
		userList.push(values[0]);
		await zeroFS.writeFile(path, JSON.stringify(userList, null, "\t"));

		const passwordHash = crypto.createHash("sha256").update(values[1]).digest("hex");
		await zeroFS.writeFile(`data/${await getPrivate()}/users/${values[0]}/meta.json`, JSON.stringify({
			passwordHash
		}, null, "\t"));

		console.log(`[register]`, values[0], values[1]);
	}
}





const dltp = new DLTPServer(async (req, con) => {
	if(req === "ui") {
		return [ui(con.uiPath || "", con.uiHash || ""), con.uiPath || "", con.uiHash || ""];
	} else if(req.startsWith("submit:")) {
		const values = JSON.parse(req.replace("submit:", ""));
		[con.uiPath, con.uiHash] = (await submit(con.uiPath || "", values)).split("#");
		return [ui(con.uiPath, con.uiHash), con.uiPath, con.uiHash];
	} else if(req.startsWith("cd:")) {
		[con.uiPath, con.uiHash] = cd(con.uiPath || "", req.replace("cd:")).split("#");
		return [ui(con.uiPath, con.uiHash), con.uiPath, con.uiHash];
	}

	throw new Error(`Unknown gateway command ${req}`);
});