import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const { program_id } = params;

	try {
		const programs = await directus.request(
			readItems('programs', {
				fields: [
					'id',
					'structure',
					'title',
					'slug',
					'dedication',
					'land_acknowledgement',
					'directors_note',
					'writers_notes',
					'cover',
					{
						production: [
							{
								show_id: [
									'*',
									{
										credits: [
											'*',
											{
												people: ['*', { people_id: ['*'] }]
											}
										]
									}
								]
							}
						]
					}
				],
				limit: 1,
				filter: {
					slug: {
						_eq: program_id
					}
				}
			})
		);

		if (!programs || programs.length === 0) {
			throw new Error('Program not found');
		}

		const [program] = programs;

		return {
			program
		};
	} catch (error) {
		console.error('Error fetching program:', error);
		return {
			status: error.message === 'Program not found' ? 404 : 500,
			error
		};
	}
}
