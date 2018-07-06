<template>
	<button class="dl-button"><slot /></button>
</template>

<style lang="sass" scoped>
	.dl-button
		display: inline-block
		height: 36px
		padding: 8px 16px
		margin-bottom: 16px

		vertical-align: top

		font-size: 16px
		background-color: $main-color
		border: 2px solid $main-color

		color: #000
		outline: none

		cursor: pointer

	.dl-button:focus
		background-color: darken($main-color, 60%)
		color: $main-color
</style>

<script type="text/javascript">
	export default {
		name: "dl-button"
	};
</script>