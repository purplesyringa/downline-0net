<template>
	<div class="remote">
		<icon name="circle-notch" spin :class="{hidden: !this.loading}" />

		<component v-if="connecting">
			<pre>Establishing encrypted connection to <i>{{host}}</i>...</pre>
		</component>
		<component v-else-if="ui.type === 'inputs'">
			<h1>{{ui.header}}</h1>

			<div v-for="[name, placeholder], i in ui.items">
				<div class="input-name">{{name}}</div><dl-input :name="placeholder" v-model="ui.itemValues[i]" />
			</div>

			<div class="desc" v-if="ui.desc">
				{{ui.desc}}
			</div>

			<dl-button @click.native="submit">{{ui.submit}}</dl-button>

			<div class="error" v-if="ui.error">
				{{ui.error}}
			</div>
		</component>
	</div>
</template>

<style lang="sass" scoped>
	.hidden
		opacity: 0

	.input-name
		display: inline-block
		width: 256px
		vertical-align: middle


	.desc
		margin: 16px 0
	.error
		margin: 16px 0
		color: $opposite-color
</style>

<script type="text/javascript">
	import "vue-awesome/icons/circle-notch";

	import {connect} from "../../libs/dltp";

	export default {
		name: "remote",
		props: ["host"],

		data() {
			return {
				host: "",
				con: null,
				connecting: true,
				loading: true,
				ui: {
					type: "",
					items: [],
					itemValues: [],
					submit: null
				}
			};
		},

		async mounted() {
			this.con = await connect(this.host);
			const ui = await this.con.send("ui");

			this.connecting = false;
			this.loading = false;
			this.render(ui);
		},

		methods: {
			render(ui) {
				this.ui = ui;
				if(ui.type === "inputs") {
					ui.itemValues = ui.items.map(() => "");
				}
			},

			async submit() {
				this.loading = true;
				this.render(await this.con.send(`submit:${JSON.stringify(this.ui.itemValues)}`));
				this.loading = false;
			}
		}
	};
</script>