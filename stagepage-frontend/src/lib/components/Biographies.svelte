<script>
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
	let { credits, showLongBios = true } = $props();

	// State
	let people = $state([]);

	// Extract people from credits
	$effect(() => {
		if (credits && credits.length > 0) {
			// Flatten the people array from credits
			people = credits.flatMap((credit) =>
				credit.people.map((personCredit) => {
					const person = personCredit.people_id;
					return {
						first_name: person.first_name,
						last_name: person.last_name,
						long_bio: person.long_bio,
						short_bio: person.short_bio,
						headshot: person.headshot,
						role: credit.role
					};
				})
			);
		}
	});

	// Function to get the headshot URL
	function getHeadshotUrl(headshotId) {
		return headshotId ? `${PUBLIC_DIRECTUS_URL}/assets/${headshotId}` : null;
	}
</script>

<div class="biographies">
	{#each people as person}
		<div class="person">
			{#if person.headshot}
				<img
					src={getHeadshotUrl(person.headshot)}
					alt="{person.first_name} {person.last_name}"
					class="headshot"
				/>
			{/if}
			<div class="info">
				<h3>{person.first_name} {person.last_name}</h3>
				<h4>{person.role}</h4>
				<p>
					{@html showLongBios
						? person.long_bio || person.short_bio || 'Biography not available.'
						: person.short_bio || person.long_bio || 'Biography not available.'}
				</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.biographies {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}
	.person {
		display: flex;
		align-items: flex-start;
		margin-bottom: 30px;
	}
	.headshot {
		width: 150px;
		height: 150px;
		object-fit: cover;
		margin-right: 20px;
		border-radius: 5px;
	}
	.info {
		flex: 1;
	}
	.info h3 {
		margin: 0;
		font-size: 24px;
	}
	.info h4 {
		margin: 5px 0;
		font-size: 18px;
		color: #555;
	}
	.info p {
		font-size: 16px;
	}
</style>
