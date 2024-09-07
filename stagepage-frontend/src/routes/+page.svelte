<script>
	import Credits from '$lib/components/Credits.svelte';
	import Biographies from '$lib/components/Biographies.svelte';

	let { data } = $props();
</script>

<h1>Program Title: {data.program.title}</h1>

<Credits />

<Biographies />

<style>
	h1 {
		color: #333;
		font-family: Arial, sans-serif;
	}

	main {
		font-family: Arial, sans-serif;
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}
</style>
