<script>
	let { data } = $props();
	console.log(data);
</script>

<h1>Program List</h1>

{#each data.programs as program}
	<a href="/{program.slug}">{program.title}</a>
{/each}

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
