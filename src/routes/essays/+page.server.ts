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
	let essays: Essay[] = [];
	console.log(PUBLISHED_ESSAYS_PATHS);
	for (const path of PUBLISHED_ESSAYS_PATHS) {
		let lastEdited = null;
		const essay = await fetch(path).then((r) => {
			lastEdited = r.headers.get('last-modified');
			return r.text();
		});
		const doc = parser.parse(essay);

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
			title: doc.title,
			paragraphs,
			lastEdited,
			source: path
		});
	}

	return { essays };
};
