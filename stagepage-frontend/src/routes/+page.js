import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	try {
		const programs = await directus.request(
			readItems('programs', {
				fields: ['id', 'title', 'slug']
			})
		);
		return {
			programs: programs || { title: 'No program found' }
		};
	} catch (error) {
		console.error('Error fetching program:', error);
		return {
			program: { title: 'Error fetching program' }
		};
	}
}
