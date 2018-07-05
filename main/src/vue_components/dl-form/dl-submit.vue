<template>
	<div class="dl-submit">
		<icon name="arrow-right" class="icon" />
	</div>
</template>

<style lang="sass" scoped>
	.dl-submit
		display: inline-block
		padding: 8px
		width: 50px
		height: 50px
		margin-left: -50px

		border-bottom: 2px solid $main-color
		border-right: 2px solid $main-color

		position: relative
		z-index: 100
		vertical-align: top

		cursor: pointer

	.icon
		display: inline-block
		width: 32px
		height: 32px
		color: $main-color
</style>

<script type="text/javascript">
	import "vue-awesome/icons/arrow-right";

	export default {
		name: "dl-submit"
	};
</script>