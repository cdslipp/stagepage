<script>
	export let credits = [
		{ role: 'Written & Performed by', name: 'Ahmad Meree' },
		{ role: 'Directed by', name: 'Majdi Bou-Matar' },
		{ role: 'Set Design', name: 'Majdi Bou-Matar' },
		{ role: 'Lighting Design', name: 'Laura Johnson' },
		{ role: 'Sound Design', name: 'Colin Labadie' },
		{ role: 'Remount Director', name: 'Ric Knowles' },
		{ role: 'Remount Consultant', name: 'Bó Bárdos' },
		{ role: 'Poster & Media Production', name: 'Rafik Alsamkary' },
		{ role: 'Stage Manager', name: 'Cameron Slipp' }
	];
</script>

<section class="credits">
	<ul>
		{#each credits as credit}
			<li>
				<span class="role">{credit.role}</span>
				<span class="name">{credit.name}</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	.credits {
		margin: 40px 0;
	}
	.credits h2 {
		font-size: 24px;
		margin-bottom: 20px;
	}
	.credits ul {
		list-style-type: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
	}
	.credits li {
		display: flex;
		flex-direction: column;
	}
	.role {
		font-weight: 700;
		margin-bottom: 5px;
	}
	.name {
		font-size: 18px;
	}
</style>
