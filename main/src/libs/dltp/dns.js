import {zeroPage} from "../../zero";

let cache = {};

export async function resolve(host) {
	if(host == "internic") {
		const siteInfo = await zeroPage.getSiteInfo();
		return siteInfo.content.config.internic;
	}
}