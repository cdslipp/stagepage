<script>
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import NavMenu from '$lib/components/NavMenu.svelte';

	let { data } = $props();

	// Use $page store to track the current section reactively
	let currentSection = $state(data.section);

	let sectionContent = $state(data.sectionContent);

	// Destructure props and set up program data
	let program = $state(data.program);
	let programStructure = program.structure;

	// Get next and previous sections reactively
	let nextSection = $derived(getNextSection(currentSection));
	let prevSection = $derived(getPreviousSection(currentSection));

	// Returns the next section based on the current section id
	function getNextSection(currentSectionId) {
		const currentIndex = program.structure.menuItems.findIndex((item) => item === currentSectionId);
		if (currentIndex === -1 || currentIndex >= program.structure.menuItems.length - 1) {
			return null; // No next section
		}
		const nextSectionId = program.structure.menuItems[currentIndex + 1];
		return program.structure.sections.find(
			(section) => section.id === nextSectionId && sectionContentExists(section)
		);
	}

	// Returns the previous section based on the current section id
	function getPreviousSection(currentSectionId) {
		const currentIndex = program.structure.menuItems.findIndex((item) => item === currentSectionId);
		if (currentIndex <= 0) {
			return null; // No previous section
		}
		const prevSectionId = program.structure.menuItems[currentIndex - 1];
		return program.structure.sections.find(
			(section) => section.id === prevSectionId && sectionContentExists(section)
		);
	}

	// Check if a section's content exists and is not null
	function sectionContentExists(section) {
		return section && program[section.id] != null;
	}

	$effect(() => {
		// Update the current section when the page store changes
		currentSection = data.section;
		sectionContent = data.sectionContent;
	});
</script>

<div class="overlay" transition:fade={{ duration: 300 }}>
	<div class="content" transition:fly={{ y: '100%', duration: 300, easing: quintOut }}>
		<h2>{programStructure.sections.find((s) => s.id === currentSection)?.title || ''}</h2>

		{@html sectionContent}

		<div class="navigation">
			{#if prevSection}
				<a href={prevSection.id}>Prev - {prevSection.title}</a>
			{/if}
			{#if nextSection}
				<a href={nextSection.id}>Next - {nextSection.title}</a>
			{/if}
		</div>
	</div>
</div>

<!-- Menu component with prev, close, and next buttons -->
<NavMenu menuState="nav" {prevSection} {nextSection} />

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

	.navigation {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
</style>
