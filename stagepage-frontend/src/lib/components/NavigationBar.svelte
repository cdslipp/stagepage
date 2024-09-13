<script>
	import { createEventDispatcher } from 'svelte';

	export let prevSection = null;
	export let nextSection = null;
	export let programSlug = '';
	export let isMainPage = false; // True on the main program page

	const dispatch = createEventDispatcher();

	function handleMenuClick() {
		dispatch('menu');
	}
</script>

<div class="navigation-bar">
	<!-- Previous Button or Back to Program -->
	{#if prevSection}
		<a href="/{programSlug}/{prevSection.id}" class="nav-button prev-button">
			&#9664; {prevSection.title}
		</a>
	{:else if !isMainPage}
		<a href="/{programSlug}" class="nav-button back-button"> &#9664; Return to Program </a>
	{/if}

	<!-- Menu Button -->
	<button class="menu-button" on:click={handleMenuClick}> Menu </button>

	<!-- Next Button or Back to Program -->
	{#if nextSection}
		<a href="/{programSlug}/{nextSection.id}" class="nav-button next-button">
			{nextSection.title} &#9654;
		</a>
	{:else if !isMainPage}
		<a href="/{programSlug}" class="nav-button back-button"> Return to Program &#9654; </a>
	{/if}
</div>

<style>
	.navigation-bar {
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
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-button,
	.menu-button {
		background: none;
		border: none;
		color: black;
		font-size: 16px;
		cursor: pointer;
		padding: 10px;
		text-decoration: none;
	}

	.menu-button {
		font-weight: bold;
	}

	.back-button {
		font-weight: bold;
	}
</style>
