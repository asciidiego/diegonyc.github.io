import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const essay = await fetch(`/essays/${params.slug}`).then(async (r) => ({
		content: await r.text(),
		metadata: { lastModified: r.headers.get('last-modified') }
	}));

	return { essay };
};
