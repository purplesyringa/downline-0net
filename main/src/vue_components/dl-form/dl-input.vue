<template>
	<input class="dl-input" :placeholder="name">
</template>

<style lang="sass" scoped>
	.dl-input
		display: inline-block
		width: 256px
		height: 50px
		padding: 8px

		vertical-align: top

		font-size: 32px
		background: none
		border: none
		border-bottom: 2px solid $main-color

		color: #FFF
		outline: none

	.dl-input:focus
		background-color: $main-color
</style>

<script type="text/javascript">
	export default {
		name: "dl-input",
		props: ["name"]
	};
</script>