<script>
	// Props to receive current section and target routes for prev/next
	let { menuOpen = $bindable(false) } = $props();

	function toggleMenu() {
		console.log('toggling menu ');
		menuOpen = !menuOpen;
	}
</script>

<div class="footer">
	<div class="grid-container">
		<!-- Previous Button -->
		<div class="nav-button-container"></div>

		<!-- Menu Button -->
		<div class="menu-button-container">
			<button id="menuButton" onclick={toggleMenu}> menu </button>
		</div>

		<!-- Next Button -->
		<div class="nav-button-container"></div>
	</div>
</div>

<style>
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: white;
		color: black;
		text-align: center;
		box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		padding: 10px 0;
	}

	.grid-container {
		display: grid;
		grid-template-columns: 1fr auto 1fr; /* Three columns: prev, menu, next */
		align-items: center;
		justify-items: center;
		width: 100%;
	}

	#menuButton {
		padding: 15px 30px;
		width: 150px;
		border: none;
		border-radius: 50px;
		color: white;
		background-color: black;
		font-size: 16px;
		cursor: pointer;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
	}

	/* Remove hover effect */
	#menuButton:hover {
		background: black;
	}

	.nav-button {
		color: black;
		text-decoration: none;
		padding: 10px;
		font-size: 14px;
	}

	.prev-button {
		text-align: left;
	}

	.next-button {
		text-align: right;
	}
</style>
