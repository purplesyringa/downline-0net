export function encode(value) {
	if(["number", "boolean", "undefined"].indexOf(typeof value) > -1 || value === null) {
		return `${value === null ? "null" : typeof value}:${value}`;
	} else if(typeof value === "object") {
		return `object:${JSON.stringify(value)}`;
	} else {
		return `${typeof value}:${Buffer.from(value).toString("base64")}`;
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