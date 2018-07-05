import "./sass/main.sass";

import Vue from "vue/dist/vue.min.js";

import AsyncComputed from "vue-async-computed";
Vue.use(AsyncComputed);

import Icon from "vue-awesome/components/Icon.vue";
Vue.component("icon", Icon);

import DLInput from "./vue_components/dl-form/dl-input.vue";
Vue.component("dl-input", DLInput);
import DLSubmit from "./vue_components/dl-form/dl-submit.vue";
Vue.component("dl-submit", DLSubmit);

Vue.prototype.$eventBus = new Vue();

import root from "./vue_components/root.vue";
var app = new Vue({
	el: "#app",
	render: h => h(root),
	data: {
		currentView: null,
		zeroPage: null
	}
});

import {route} from "./route.js";
import {zeroPage} from "./zero";
route(app);

Vue.prototype.$zeroPage = zeroPage;

(async function() {
	const siteInfo = await zeroPage.getSiteInfo();
	app.$eventBus.$emit("setSiteInfo", siteInfo);
})();
zeroPage.on("setSiteInfo", msg => {
	app.$eventBus.$emit("setSiteInfo", msg.params);
});