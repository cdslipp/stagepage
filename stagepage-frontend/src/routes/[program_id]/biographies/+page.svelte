<script>
	import Biographies from '$lib/components/Biographies.svelte';

	let { data } = $props();

	let credits = data.program.production.show_id.credits;
	console.log('Credits', credits);
</script>

<h1>TEST BIOS</h1>
<Biographies {credits} />
