<script>
	export let menuState = 'menu'; // 'menu', 'close', or 'nav'

	export let onClick = () => {};
</script>

<div class="menu-button-container">
	<button id="menuButton" on:click={onClick}>
		{#if menuState === 'menu'}
			menu
		{:else if menuState === 'close'}
			close
		{:else if menuState === 'nav'}
			<div class="nav-buttons">
				<span>&#9664; prev</span>
				<span>next &#9654;</span>
			</div>
		{/if}
	</button>
</div>

<style>
	.menu-button-container {
		position: fixed;
		width: 100%;
		height: 150px;
		background: linear-gradient(180deg, rgba(255, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 100%);
		left: 50%;
		bottom: 0px;
		transform: translateX(-50%);
		z-index: 1000;
		display: flex;
		flex-direction: row;
		align-items: end;
		justify-content: center;
		padding-bottom: 15px;
	}

	#menuButton {
		position: relative;
		padding: 15px 30px;
		border: none;
		border-radius: 50px;
		color: white;
		background-color: black;
		font-size: 16px;
		cursor: pointer;
		transition:
			transform 0.3s,
			background 0.3s;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
	}

	#menuButton:active {
		transform: scale(0.95);
	}

	#menuButton:hover {
		background: rgba(255, 255, 255, 1);
	}

	.nav-buttons {
		display: flex;
		justify-content: space-between;
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}
</style>
