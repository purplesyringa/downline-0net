import DLTPServer from "./dltp/server";

const dltp = new DLTPServer(req => {
	return req + "!!ok";
});