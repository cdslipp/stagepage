import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	try {
		const programs = await directus.request(
			readItems('programs', {
				fields: ['id', 'title'],
				limit: 1 // Assuming we're just getting the first program for now
			})
		);
		return {
			program: programs[0] || { title: 'No program found' }
		};
	} catch (error) {
		console.error('Error fetching program:', error);
		return {
			program: { title: 'Error fetching program' }
		};
	}
}
