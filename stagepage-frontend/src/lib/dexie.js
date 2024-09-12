import Dexie from 'dexie';
import { createDirectus, rest, realtime, staticToken } from '@directus/sdk';
import {
	PUBLIC_DIRECTUS_URL,
	PUBLIC_DIRECTUS_ACCESS_TOKEN,
	PUBLIC_DIRECTUS_WSS
} from '$env/static/public';
import getDirectusInstance from '$lib/directus'; // Import Directus instance
import getDirectusClientSide from '$lib/directus';
import { browser } from '$app/environment';

// Initialize the Dexie database
export const db = new Dexie('programDatabase');
db.version(1).stores({
	programs: '++id, slug, title, structure'
});

// Store the program in IndexedDB on load
export async function storeProgram(program) {
	try {
		await db.programs.put({
			id: program.id,
			slug: program.slug,
			title: program.title,
			structure: program.structure,
			dedication: program.dedication,
			land_acknowledgement: program.land_acknowledgement,
			directors_note: program.directors_note,
			writers_notes: program.writers_notes,
			cover: program.cover,
			production: program.production
		});
		console.log('Program stored in IndexedDB:', program.title);
	} catch (error) {
		console.error('Failed to store program:', error);
	}
}

// Subscribe to real-time updates for the program
export async function subscribeToProgramUpdates(programId) {
	const directus = createDirectus(PUBLIC_DIRECTUS_WSS).with(realtime()); // WebSocket for real-time updates

	if (browser) {
		try {
			await directus.connect();
			console.log('Connected to WebSocket');

			console.log('Connected');

			// Listen for WebSocket events
			directus.onWebSocket('open', () => {
				// console.log('WebSocket connection established');
			});

			directus.onWebSocket('close', () => {
				// console.log('WebSocket connection closed');
			});

			directus.onWebSocket('error', (error) => {
				console.error('WebSocket error:', error);
			});

			// Subscribe to program updates
			const { subscription } = await directus.subscribe('programs', {
				event: 'update',
				query: { filter: { id: { _eq: programId } } } // Subscribe to updates for this program
			});

			// Handle the real-time updates
			for await (const updatedProgram of subscription) {
				console.log('Program updated:', updatedProgram);
				storeProgram(updatedProgram); // Store updated program in Dexie
			}
		} catch (error) {
			console.error('Failed to set up WebSocket subscription:', error);
		}
	}
}
