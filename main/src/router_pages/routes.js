import Home from "./home/home.vue";
import Register from "./register/register.vue";

export default vue => [
	{
		path: "",
		controller: () => {
			vue.currentView = Home;
		}
	},

	{
		path: "register",
		controller: () => {
			vue.currentView = Register;
		}
	}
];