<template>
	<div class="remote">
		<component v-if="connecting">
			<pre>Establishing encrypted connection to <i>{{host}}</i>...</pre>
		</component>
		<component v-else-if="ui.type === 'inputs'">
			<h1>{{ui.header}}</h1>

			<div v-for="[name, placeholder] in ui.items">
				<div class="input-name">{{name}}</div><dl-input :name="placeholder" />
			</div>

			<dl-button>{{ui.submit}}</dl-button>
		</component>
	</div>
</template>

<style lang="sass" scoped>
	span
		color: red

	.input-name
		display: inline-block
		width: 256px
		vertical-align: middle
</style>

<script type="text/javascript">
	import {connect} from "../../libs/dltp";

	export default {
		name: "remote",
		props: ["host"],

		data() {
			return {
				host: "",
				con: null,
				connecting: true,
				ui: {
					type: "",
					items: [],
					submit: null
				}
			};
		},

		async mounted() {
			this.con = await connect(this.host);
			const ui = await this.con.send("ui");

			this.connecting = false;
			this.render(ui);
		},

		methods: {
			render(ui) {
				this.ui = ui;
			}
		}
	};
</script>