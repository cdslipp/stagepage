<script>
	import Credits from '$lib/components/Credits.svelte';
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
	import { browser } from '$app/environment';
	import { storeProgram } from '$lib/dexie';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import OverlayMenu from '$lib/components/OverlayMenu.svelte';

	/** @type {import('./$types').PageData} */
	let { data } = $props();

	let programCover = `${PUBLIC_DIRECTUS_URL}/assets/${data.program.cover}`;
	let showMenu = $state(false);
	let programStructure = data.program.structure || { sections: [], menuItems: [] };
	let programSlug = data.program.slug;

	if (browser) {
		storeProgram(data.program);
	}

	function toggleMenu() {
		showMenu = !showMenu;
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
		{/if}
	{/each}
</main>

<MenuBar menuState="menu" onClickClose={toggleMenu} />

{#if showMenu}
	<OverlayMenu menuItems={programStructure.sections} {programSlug} on:close={handleCloseMenu} />
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
		object-fit: cover;
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
