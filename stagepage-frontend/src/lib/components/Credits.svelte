<script>
	let { credits = [] } = $props();

	function sortCreditsByOrder(credits) {
		return credits.sort((a, b) => Number(a.credit_order) - Number(b.credit_order));
	}

	let sortedCredits = $derived(sortCreditsByOrder(credits));

	function formatListNames(people) {
		if (people.length === 1)
			return `${people[0].people_id.first_name} ${people[0].people_id.last_name}`;

		const names = people.map(
			(person) => `${person.people_id.first_name} ${person.people_id.last_name}`
		);
		const lastPerson = names.pop();
		return `${names.join(', ')}, and ${lastPerson}`;
	}
</script>

<section class="credits">
	<h2>Credits</h2>

	{#snippet singleCredit(credit)}
		<li>
			<span class="role">{credit.role}:</span>
			<span class="name">
				{credit.people[0].people_id.first_name}
				{credit.people[0].people_id.last_name}
			</span>
		</li>
	{/snippet}

	{#snippet listCredit(credit)}
		<li>
			<span class="role">{credit.role}</span>
			<span class="name">{formatListNames(credit.people)}</span>
		</li>
	{/snippet}

	<ul class="credit-list">
		{#each sortedCredits as credit}
			{#if credit.display_type === 'single'}
				{@render singleCredit(credit)}
			{:else}
				{@render listCredit(credit)}
			{/if}
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
	.credits {
		margin: 40px 0;
	}
	.credits h2 {
		font-size: 24px;
		margin-bottom: 20px;
	}
	.credit-list {
		list-style-type: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(1200px, 2fr));
		gap: 10px;
	}
	.credit-list li {
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
