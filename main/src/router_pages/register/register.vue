<template>
	<remote class="root" host="gateway.dl" />
</template>

<style lang="sass" scoped>
	.root
		position: absolute
		left: 50%
		top: 50%
		transform: translate(-50%, -50%)

		display: block
		width: 512px
</style>

<script type="text/javascript">
	export default {
		name: "register"
	};
</script>