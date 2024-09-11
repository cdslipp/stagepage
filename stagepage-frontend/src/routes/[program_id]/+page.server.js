import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const { program_id } = params;

	console.log('program_id', program_id);

	try {
		const programs = await directus.request(
			readItems('programs', {
				fields: [
					'id',
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
								show_id: [`*`, { credits: [`*`, { people: ['*', { people_id: ['*'] }] }] }]
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

		console.log('programs', programs[0]);
		console.log('programs', programs[0].production.show_id.credits[0]);

		if (programs.length === 0) {
			return {
				status: 404,
				error: new Error('Program not found')
			};
		}

		const program = programs[0];

		return {
			program: {
				...program
			}
		};
	} catch (error) {
		console.error('Error fetching program:', error);
		return {
			status: 500,
			error: new Error('Error fetching program')
		};
	}
}
