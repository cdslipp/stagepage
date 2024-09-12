<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let menuItems = [];
	export let programSlug = '';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}
</script>

<div class="menu-overlay" transition:fade={{ duration: 300 }}>
	<div
		class="menu-content"
		transition:slide={{ direction: 'bottom', duration: 300, easing: quintOut }}
	>
		<button class="close-menu" on:click={handleClose}>&times;</button>
		<nav>
			{#each menuItems as item}
				<a href="/{programSlug}/{item.id}" on:click={handleClose}>
					{item.title}
				</a>
			{/each}
		</nav>
	</div>
</div>

<style>
	.menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	.menu-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
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
	nav a {
		color: black;
		text-decoration: none;
		font-size: 32px;
		font-weight: 700;
		margin: 20px 0;
		transition: color 0.3s;
	}
	nav a:hover {
		color: #555;
	}
</style>
