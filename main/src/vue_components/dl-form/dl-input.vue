<template>
	<div class="dl-input">
		<input :placeholder="name">
	</div>
</template>

<style lang="sass" scoped>
	.dl-input
		display: inline-block
		width: 256px
		height: 50px

		position: relative
		vertical-align: top


	input
		display: block
		width: 100%
		height: 50px
		padding: 8px

		position: absolute
		left: 0
		top: 0

		font-size: 32px
		background: none
		border: none
		border-bottom: 2px solid $main-color

		color: #FFF
		outline: none

	input:focus
		background-color: $main-color
</style>

<script type="text/javascript">
	export default {
		name: "dl-input",
		props: ["name"]
	};
</script>