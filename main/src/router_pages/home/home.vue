<template>
	<div class="root">
		<header>Downline</header>

		<div class="user-icon-container">
			<icon name="user" class="user-icon" />
		</div>

		<dl-input name="Login" /><br>
		<dl-input name="Password" /><dl-submit />
	</div>
</template>

<style lang="sass" scoped>
	.root
		position: absolute
		left: 50%
		top: 50%
		transform: translateX(-50%) translateY(-50%)



	header
		display: block
		margin-bottom: 32px

		color: $main-color
		font-size: 64px
		text-align: center


	.user-icon-container
		height: 130px
		margin-right: 16px
		border: 2px solid
		border-bottom-width: 10px
		color: $main-color

		float: left

	.user-icon
		width: 128px
		height: 128px
</style>

<script type="text/javascript">
	import "vue-awesome/icons/user";

	export default {
		name: "home"
	};
</script>