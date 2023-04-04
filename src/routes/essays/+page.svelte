<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let essays = data.essays;
</script>

<main>
	{#each essays as essay, i}
		<details open={i === 0}>
			<summary
				>{essay.title}
				<span><a class="src-link" href={'/src' + essay.source}>(view source)</a></span>
			</summary>
			<section>
				{#each essay.paragraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			</section>
		</details>
	{/each}
</main>

<style>
	details {
		margin: 1em 0;
	}

	summary {
		font-size: 1.2em;
		font-weight: bold;
		margin-bottom: 0.5em;
		user-select: none;
		cursor: pointer;
	}

	summary::marker {
		content: '▶ ';
		color: #000;
		font-size: 1.2em;
		margin-right: 0.5em;
		font-family: monospace;
	}

	details[open] summary::marker {
		content: '▼ ';
	}

	section {
		margin: 1em 0;
	}

	/* Only show src-link if hovering over summary */
	.src-link {
		display: none;
		font-family: monospace;
		font-size: 0.8em;
		font-weight: normal;
		color: #000;
		text-decoration: none;
	}

	summary:hover .src-link {
		display: inline;
	}

	.src-link:hover {
		text-decoration: underline;
	}
</style>
