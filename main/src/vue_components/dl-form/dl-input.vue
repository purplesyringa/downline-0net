<template>
	<input :class="['dl-input', {'big': big}]" :placeholder="name">
</template>

<style lang="sass" scoped>
	.dl-input
		display: inline-block
		width: 256px
		height: 34px
		padding: 8px
		margin-bottom: 16px

		vertical-align: top

		font-size: 16px
		background: none
		border: none
		border-bottom: 2px solid $main-color

		color: #FFF
		outline: none

	.dl-input:focus
		background-color: $main-color


	.big
		height: 50px
		font-size: 32px
</style>

<script type="text/javascript">
	export default {
		name: "dl-input",
		props: ["name", "big"]
	};
</script>