import Org from 'org';
import type { PageServerLoad } from './$types';
import { PUBLISHED_ESSAYS_PATHS } from '$lib/essays';

const parser = new Org.Parser();

type Essay = {
	title: string;
	paragraphs: string[];
	lastEdited: string | null;
	source: string;
};

export const ssr = true;
export const prerender = true;
export const load: PageServerLoad = async ({ params, fetch }) => {
	const essays: Essay[] = [];
	for (const essayPath of PUBLISHED_ESSAYS_PATHS) {
		const essay = await fetch(essayPath).then(async (r) => ({
			content: await r.text(),
			metadata: { lastModified: r.headers.get('last-modified') }
		}));
		const doc = parser.parse(essay.content);

		// traverse the tree and extract the paragraphs
		const paragraphs = [] as string[];
		doc.nodes.forEach((node: any) => {
			if (node.type !== 'paragraph') return;
			// keep traversing until we find a node with `value` property
			let paragraph = node.value;
			while (!paragraph) {
				paragraph = node.children[0]?.value;
				node = node.children[0];
			}

			// extra parsing
			const withDashes = (str: string) => str.replace(/\-\-\-/g, '—').replace(/\-\-/g, '–');

			paragraphs.push(withDashes(paragraph));
		});

		essays.push({
			// Metadata
			title: doc.title,
			lastEdited: essay.metadata.lastModified,
			source: essayPath,

			// Content
			paragraphs
		});
	}

	return { essays };
};
