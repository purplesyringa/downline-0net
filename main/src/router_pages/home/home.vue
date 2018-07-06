<template>
	<div class="root">
		<header>Downline</header>

		<div class="user-icon-container">
			<icon name="user" class="user-icon" />
		</div>

		<dl-input name="Login" /><br>
		<dl-input name="Password" /><dl-submit /><br>

		<dl-button class="register" @click.native="$router.navigate('register')">First time playing? Register</dl-button>

		<div class="warning">
			This game will expose your real IP to our servers. If you don't mind, just register a new account and start playing. If you <i>do</i> mind, restart ZeroNet in "Tor Always" mode (using Tor Browser won't help).
		</div>
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

	.register
		display: block !important
		margin: 16px auto 0


	.warning
		display: block
		margin: 0 auto
		width: 300px
		margin-top: 48px

		color: $main-color
		text-align: center
</style>

<script type="text/javascript">
	import "vue-awesome/icons/user";

	export default {
		name: "home"
	};
</script>