import DLTPServer from "./dltp/server";
import {zeroFS} from "./dltp/zero";



function ui(path) {
	if(path === "") {
		// Root
		return {
			type: "inputs",
			header: "Register",
			items: [
				["Login", "ivanq"],
				["Password", "password123"],
				["Repeat password", "password123"]
			],
			submit: "Register"
		};
	}
}

const dltp = new DLTPServer((req, con) => {
	if(req === "ui") {
		return ui(con.uiPath || "");
	} else if(req.startsWith("cd:")) {
		con.uiPath = cd(rcon.uiPath || "", eq.replace("cd:"));
		return ui(con.uiPath || "");
	}

	throw new Error(`Unknown gateway command ${req}`);
});