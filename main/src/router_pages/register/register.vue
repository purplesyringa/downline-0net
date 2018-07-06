<template>
	<div class="root" ref="register"></div>
</template>

<style lang="sass" scoped>
	.root
		position: absolute
		left: 32px
		top: 32px
</style>

<script type="text/javascript">
	import {connect} from "../../libs/dltp";

	export default {
		name: "register",
		async mounted() {
			const con = await connect("gateway.dl");
			console.log(con);
		}
	};
</script>