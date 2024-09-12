<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let { data } = $props();

	console.log('page data', data);

	console.log('Page data', $page);

	let currentSection = $page.params.section;
	let programStructure = $page.data.program.structure;
	let sectionContent = $page.data.program[currentSection];

	function getNextSection(currentId) {
		const currentIndex = programStructure.sections.findIndex((s) => s.id === currentId);
		return programStructure.sections[currentIndex + 1];
	}

	function getPreviousSection(currentId) {
		const currentIndex = programStructure.sections.findIndex((s) => s.id === currentId);
		return programStructure.sections[currentIndex - 1];
	}

	function navigateToNext() {
		const nextSection = getNextSection(currentSection);
		if (nextSection) {
			goto(`${$page.url.pathname.split('/').slice(0, -1).join('/')}/${nextSection.id}`);
		}
	}

	function navigateToPrevious() {
		const previousSection = getPreviousSection(currentSection);
		if (previousSection) {
			goto(`${$page.url.pathname.split('/').slice(0, -1).join('/')}/${previousSection.id}`);
		}
	}

	function closeArticle() {
		goto($page.url.pathname.split('/').slice(0, -1).join('/'));
	}
</script>

<div class="overlay" transition:fade={{ duration: 300 }}>
	<div class="content" transition:fly={{ y: '100%', duration: 300, easing: quintOut }}>
		<button class="close" on:click={closeArticle}>&times;</button>
		<h2>{programStructure.sections.find((s) => s.id === currentSection).title}</h2>
		{@html sectionContent}

		<div class="navigation">
			{#if getPreviousSection(currentSection)}
				<button on:click={navigateToPrevious}>Previous</button>
			{/if}
			{#if getNextSection(currentSection)}
				<button on:click={navigateToNext}>Next</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: white;
		overflow-y: auto;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content {
		padding: 20px;
		min-height: 100%;
		max-width: 1000px;
		box-sizing: border-box;
	}

	h2 {
		margin-top: 0;
	}

	.close {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 24px;
		background: none;
		border: none;
		cursor: pointer;
	}

	.navigation {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	button {
		padding: 10px 20px;
		background-color: #f0f0f0;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	button:hover {
		background-color: #e0e0e0;
	}
</style>
