<script>
	import { createEventDispatcher } from 'svelte';

	let { menuItems = [], programSlug = '', menuOpen = $bindable() } = $props();

	console.log('Program slug', programSlug);

	function handleClose() {
		menuOpen = false;
	}
</script>

<div class="menu-overlay">
	<button class="close-menu" on:click={handleClose}>&times;</button>
	<nav>
		{#each menuItems as item}
			<a href="/{programSlug}/{item.id}" on:click={handleClose}>
				{item.title}
			</a>
		{/each}
	</nav>
</div>

<style>
	.menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(5px);
		z-index: 1001;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.close-menu {
		position: absolute;
		top: 20px;
		right: 20px;
		font-size: 32px;
		background: none;
		border: none;
		color: black;
		cursor: pointer;
	}

	nav {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	nav a {
		margin: 10px 0;
		font-size: 24px;
		color: black;
		text-decoration: none;
		transition: color 0.3s;
	}

	nav a:hover {
		color: #555;
	}
</style>
