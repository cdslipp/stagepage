<script>
	// Props to receive current section and target routes for prev/next
	export let menuState = 'nav'; // Default to 'nav' mode
	export let prevSection = null; // Previous section object
	export let nextSection = null; // Next section object
	export let onClickClose = () => {}; // Function to handle close button click
</script>

<div class="menu-button-container">
	<!-- Navigation buttons -->
	<button id="menuButton">
		{#if menuState === 'nav'}
			<div class="nav-buttons">
				<!-- Previous Section -->
				{#if prevSection}
					<a href={prevSection.id} class="nav-button prev-button">
						&#9664; {prevSection.title}
					</a>
				{/if}

				<!-- Close Button -->
				<span class="close-button" on:click={onClickClose}>close</span>

				<!-- Next Section -->
				{#if nextSection}
					<a href={nextSection.id} class="nav-button next-button">
						{nextSection.title} &#9654;
					</a>
				{/if}
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

	#menuButton:hover {
		background: rgba(255, 255, 255, 1);
	}

	.nav-buttons {
		display: flex;
		justify-content: space-between;
		width: 100%;
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

	.close-button {
		cursor: pointer;
		font-size: 16px;
		margin: 0 20px;
	}
</style>
