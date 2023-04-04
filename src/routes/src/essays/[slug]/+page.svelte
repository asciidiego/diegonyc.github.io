<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { essay } = data;

	function copyToClipboard(event: MouseEvent) {
		const button = event.target as HTMLButtonElement;
		button.innerText = 'Copied!';
		navigator.clipboard.writeText(essay.content);
		setTimeout(() => (button.innerText = 'Copy'), 1000);
	}
</script>

<main>
	<section id="raw">
		<h2>File contents</h2>
		<div id="copy-container">
			<button id="copy-button" type="button" on:click={copyToClipboard}> Copy </button>
			<pre>{@html essay.content}</pre>
		</div>
	</section>
	<section id="metadata">
		<h2>Metadata</h2>
		<pre>{JSON.stringify(essay.metadata, null, 2)}</pre>
	</section>
</main>

<style>
	pre {
		background: #eee;
		padding: 1em;
		border-radius: 0.5em;
		word-wrap: break-word;
		outline: none;
		overflow: auto;
	}

	#copy-container {
		position: relative;
	}

	#copy-button {
		width: 80px;
		position: absolute;
		top: 0;
		right: 0;
		margin: 0.5em;
		border: 1px solid #ccc;
		border-radius: 0.5em;
		background-color: #fff;
		padding: 0.25em;
		font-family: monospace;
	}

	#copy-button:hover {
		background-color: #eee;
	}
</style>
