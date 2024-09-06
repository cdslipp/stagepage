import { createDirectus, rest, realtime, staticToken } from '@directus/sdk';
import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { PUBLIC_DIRECTUS_ACCESS_TOKEN } from '$env/static/public';

function getDirectusInstance(fetch) {
	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus(PUBLIC_DIRECTUS_URL, options).with(rest());
	return directus;
}

export default getDirectusInstance;
