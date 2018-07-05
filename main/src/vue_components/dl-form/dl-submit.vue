<template>
	<button class="dl-submit">
		<icon name="arrow-right" class="icon" />
	</button>
</template>

<style lang="sass">
	.dl-input:focus + .dl-submit
		color: #FFF
</style>

<style lang="sass" scoped>
	.dl-submit
		display: inline-block
		padding: 8px
		width: 50px
		height: 50px
		margin-left: -50px

		background: none
		border: none
		border-bottom: 2px solid $main-color
		border-right: 2px solid $main-color

		position: relative
		z-index: 100
		vertical-align: top

		cursor: pointer
		color: $main-color
		outline: none

	.dl-submit:focus
		background-color: $main-color
		color: #FFF

	.icon
		display: inline-block
		width: 32px
		height: 32px
</style>

<script type="text/javascript">
	import "vue-awesome/icons/arrow-right";

	export default {
		name: "dl-submit"
	};
</script>