<script>
	import Credits from '$lib/components/Credits.svelte';
	import { fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import { browser } from '$app/environment';

	import { storeProgram, subscribeToProgramUpdates } from '$lib/dexie';

	/** @type {import('./$types').PageData} */
	let { data } = $props();

	let programCover = PUBLIC_DIRECTUS_URL + '/assets/' + data.program.cover;

	let currentArticle = $state(null);

	let showMenu = $state(false);
	let currentMenuState = 'menu'; // Can be 'menu', 'close', or 'nav'

	if (browser) {
		storeProgram(data.program);
		subscribeToProgramUpdates(data.directus, data.program.id); // Set up WebSocket subscription for real-time updates
	}

	function toggleMenu() {
		showMenu = !showMenu;
		currentMenuState = showMenu ? 'close' : 'menu';
	}

	function navigateToNext() {
		// logic to navigate to the next section...
		currentMenuState = 'nav'; // set the state to show nav buttons
	}

	function navigateToPrevious() {
		// logic to navigate to the previous section...
		currentMenuState = 'nav'; // set the state to show nav buttons
	}

	function closeMenu() {
		showMenu = false;
		currentMenuState = 'menu';
	}

	function scrollToSection(id) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		showMenu = false;
	}

	let programStructure = $derived(
		data.program.structure || {
			sections: [],
			menuItems: []
		}
	);

	function openArticle(section) {
		currentArticle = section;
	}

	function closeArticle() {
		currentArticle = null;
	}

	function getNextSection(currentId) {
		const currentIndex = programStructure.sections.findIndex((s) => s.id === currentId);
		return programStructure.sections[currentIndex + 1];
	}

	function getPreviousSection(currentId) {
		const currentIndex = programStructure.sections.findIndex((s) => s.id === currentId);
		return programStructure.sections[currentIndex - 1];
	}
</script>

{#snippet coverSection(cover, title)}
	<img src={cover} alt="Program Cover" />
	<h1 class="title">{title}</h1>
{/snippet}

{#snippet contentSection(section, content)}
	<a href="/{data.program.slug}/{section.id}">
		<article id={section.id}>
			<h2>{section.title}</h2>
			{@html content.slice(0, 200) + '...'}
			<span class="read-more">Read more</span>
		</article>
	</a>
{/snippet}

{#snippet creditsSection(credits)}
	<section id="credits">
		<Credits {credits} />
	</section>
{/snippet}

{#snippet qrCodeSection(section)}
	<section id={section.id}>
		<h2>{section.title}</h2>
		<!-- Insert QR code component or image here -->
	</section>
{/snippet}

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	{#each programStructure.sections as section}
		{#if section.type === 'cover'}
			{@render coverSection(programCover, data.program.title)}
		{:else if section.type === 'content'}
			{#if data.program[section.id]}
				{@render contentSection(section, data.program[section.id])}
			{/if}
		{:else if section.type === 'credits'}
			{@render creditsSection(data.program.production.show_id.credits)}
		{:else if section.type === 'qr_code'}
			{@render qrCodeSection(section)}
		{/if}
	{/each}
</main>

<MenuBar state={currentMenuState} onClick={toggleMenu} />

<!-- Fullscreen overlay menu -->
{#if showMenu}
	<div class="menu-overlay" transition:fade={{ duration: 300 }}>
		<div
			class="menu-content"
			transition:slide={{ direction: 'bottom', duration: 300, easing: quintOut }}
		>
			<button class="close-menu" on:click={toggleMenu}>&times;</button>
			<nav>
				{#each programStructure.menuItems as itemId}
					{#if programStructure.sections.find((s) => s.id === itemId)}
						<a href="#{itemId}" on:click|preventDefault={() => scrollToSection(itemId)}>
							{programStructure.sections.find((s) => s.id === itemId).title}
						</a>
					{/if}
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
		padding-top: 0.7rem;
		color: #333;
	}
	img {
		width: 100%;
		display: cover;
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

	button {
		background-color: #f0f0f0;
		border: none;
		padding: 5px 10px;
		margin-top: 10px;
		cursor: pointer;
		border-radius: 5px;
	}
	button:hover {
		background-color: #e0e0e0;
	}

	article {
		cursor: pointer;
		padding: 15px;
		border: 1px solid #e0e0e0;
		border-radius: 5px;
		margin-bottom: 20px;
		transition: background-color 0.3s;
	}

	article:hover {
		background-color: #f9f9f9;
	}

	.read-more {
		color: #0066cc;
		font-weight: bold;
	}
</style>
