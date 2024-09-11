<script>
	let credits = [
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

<article>
	<section class="credits">
		<h2>Credits</h2>
		<ul>
			{#each credits as credit}
				<li>
					<span class="role">{credit.role}:</span>
					<span class="name">{credit.name}</span>
				</li>
			{/each}
		</ul>
	</section>
</article>

<style>
	.credits ul {
		list-style-type: none;
		padding: 0;
	}
	.credits li {
		margin-bottom: 10px;
	}
	.role {
		font-weight: bold;
		margin-right: 5px;
	}
</style>
