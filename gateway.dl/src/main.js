import DLTPServer from "./dltp/server";
import {zeroFS} from "./dltp/zero";

let cache = null;

const dltp = new DLTPServer(req => {
	return "Hello from gateway.dl!";
});