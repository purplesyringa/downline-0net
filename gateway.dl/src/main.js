import DLTPServer from "./dltp/server";
import {zeroFS} from "./dltp/zero";



function ui(path) {
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
			submit: "Register"
		};
	} else if(path === "register/passunmatch") {
		// Registration error
		return {
			type: "inputs",
			header: "Register",
			items: [
				["Login", "ivanq"],
				["Password", "password123"],
				["Repeat password", "password123"]
			],
			error: "Passwords don't match",
			submit: "Register"
		};
	}
}

function submit(path, values) {
	if(path === "") {
		// Register
		if(values[1] !== values[2]) {
			return "register/passunmatch";
		}
		console.log(`[register]`, values[0], values[1]);
	}
}





const dltp = new DLTPServer(async (req, con) => {
	if(req === "ui") {
		return ui(con.uiPath || "");
	} else if(req.startsWith("submit:")) {
		const values = JSON.parse(req.replace("submit:", ""));
		con.uiPath = await submit(con.uiPath || "", values);
		return ui(con.uiPath || "");
	} else if(req.startsWith("cd:")) {
		con.uiPath = cd(con.uiPath || "", req.replace("cd:"));
		return ui(con.uiPath || "");
	}

	throw new Error(`Unknown gateway command ${req}`);
});