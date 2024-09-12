<script>
	// Props to receive current section and target routes for prev/next
	export let menuState = 'nav'; // Default to 'nav' mode
	export let prevSection = null; // Previous section object
	export let nextSection = null; // Next section object
	export let onClickClose = () => {}; // Function to handle close button click
</script>

<div class="footer">
	<div class="grid-container">
		<!-- Previous Button -->
		<div class="nav-button-container">
			{#if prevSection}
				<a href={prevSection.id} class="nav-button prev-button">
					&#9664; {prevSection.title}
				</a>
			{/if}
		</div>

		<!-- Menu Button -->
		<div class="menu-button-container">
			<button id="menuButton" on:click={onClickClose}>
				{menuState === 'nav' ? 'menu' : 'close'}
			</button>
		</div>

		<!-- Next Button -->
		<div class="nav-button-container">
			{#if nextSection}
				<a href={nextSection.id} class="nav-button next-button">
					{nextSection.title} &#9654;
				</a>
			{/if}
		</div>
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
