/** @type {import('./$types').PageServerLoad} */
export async function load({ params, parent }) {
	const { section } = params;
	const { program } = await parent();

	let sectionContent = program[section] || '';

	return {
		section,
		sectionContent,
		program
	};
}
