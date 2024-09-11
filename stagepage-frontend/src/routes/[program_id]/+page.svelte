<script>
	import Credits from '$lib/components/Credits.svelte';
	import { fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
	/** @type {import('./$types').PageData} */
	export let data;
	let programCover = PUBLIC_DIRECTUS_URL + '/assets/' + data.program.cover;
	let showMenu = false;
	function toggleMenu() {
		showMenu = !showMenu;
	}
	const menuItems = [
		{ id: 'credits', title: 'Credits' },
		{ id: 'land-acknowledgement', title: 'Land Acknowledgement' },
		{ id: 'directors-note', title: "Director's Note" },
		{ id: 'biographies', title: 'Biographies' },
		{ id: 'upcoming-performances', title: 'Upcoming Performances' }
	];
	function scrollToSection(id) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		showMenu = false;
	}
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<img src={programCover} alt="Program Cover" />
	<h1>{data.program.title}</h1>
	{#if data.program.dedication}
		<section id="dedication" class="dedication">
			<h2>Dedication</h2>
			{@html data.program.dedication}
		</section>
	{/if}
	{#if data.program.land_acknowledgement}
		<section id="land-acknowledgement" class="land-acknowledgement">
			<h2>Land Acknowledgement</h2>
			{@html data.program.land_acknowledgement}
		</section>
	{/if}
	<section id="credits">
		<Credits credits={data.program.credits} />
	</section>
	<!-- Add other sections here as they become available in your data -->
	<section id="directors-note">
		<h2>Director's Note</h2>
		<!-- Add director's note content here -->
	</section>
	<section id="biographies">
		<h2>Biographies</h2>
		<!-- Add biographies content here -->
	</section>
	<section id="upcoming-performances">
		<h2>Upcoming Performances</h2>
		<!-- Add upcoming performances content here -->
	</section>
</main>

<!-- Centered menu button -->
<div class="nav-menu">
	{#if !showMenu}
		<button id="navButton" on:click={toggleMenu}>menu</button>
	{/if}
</div>

<!-- Fullscreen overlay menu -->
{#if showMenu}
	<div class="menu-overlay" transition:fade={{ duration: 300 }}>
		<div
			class="menu-content"
			transition:slide={{ direction: 'bottom', duration: 300, easing: quintOut }}
		>
			<button class="close-menu" on:click={toggleMenu}>&times;</button>
			<nav>
				{#each menuItems as item}
					<a href="#{item.id}" on:click|preventDefault={() => scrollToSection(item.id)}
						>{item.title}</a
					>
				{/each}
			</nav>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', sans-serif;
	}
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}
	h1 {
		color: #333;
	}
	.dedication,
	.land-acknowledgement {
		margin: 20px 0;
		padding: 15px;
		background-color: #f9f9f9;
		border-left: 5px solid #333;
	}
	.nav-menu {
		position: fixed;
		left: 50%;
		bottom: 20px;
		transform: translateX(-50%);
		z-index: 1000;
	}
	#navButton {
		padding: 10px 20px;
		border: none;
		border-radius: 50px;
		background-color: #333;
		color: white;
		font-size: 16px;
		cursor: pointer;
		transition: transform 0.3s;
	}
	#navButton:active {
		transform: scale(0.9);
	}
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
		justify-content: center;
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
	nav {
		display: flex;
		flex-direction: column;
		align-items: center;
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
