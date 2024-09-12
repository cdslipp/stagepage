import { createDirectus, rest, realtime, staticToken } from '@directus/sdk';
import { PUBLIC_DIRECTUS_URL, PUBLIC_DIRECTUS_ACCESS_TOKEN } from '$env/static/public';
import { browser } from '$app/environment';

export default function getDirectusInstance(fetch) {
	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus(PUBLIC_DIRECTUS_URL, options)
		.with(rest())
		.with(staticToken(PUBLIC_DIRECTUS_ACCESS_TOKEN))
		.with(realtime());
	return directus;
}

// Create Directus instance for WebSocket connection
export function getDirectusClientSide() {
	const directus = createDirectus(PUBLIC_DIRECTUS_URL)
		.with(staticToken(PUBLIC_DIRECTUS_ACCESS_TOKEN)) // Add authentication
		.with(realtime()); // WebSocket for real-time updates

	return directus;
}
