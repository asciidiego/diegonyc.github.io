<script lang="ts">
	import { page } from '$app/stores';
	import './styles.css';

	type MenuLink = {
		type: 'link';
		id: string;
		title: string;
	};
	type MenuDivider = {
		type: 'divider';
	};
	type InvisibleItem = {
		type: 'invisible';
	} & Record<string, any>;
	type MenuItem = MenuLink | MenuDivider | InvisibleItem;

	const menuItems: MenuItem[] = [
		{
			type: 'link',
			id: '/',
			title: 'Home'
		},
		{
			type: 'link',
			id: '/essays',
			title: 'Essays'
		},
		{
			type: 'invisible',
			id: '/write',
			title: 'Write'
		},

		{ type: 'divider' },

		{
			type: 'link',
			id: 'https://twitter.com/asciidiego',
			title: 't'
		}
	];
</script>

<div class="root">
	<aside class="left-menu">
		<h1>Diego Rodriguez</h1>
		<ul>
			{#each menuItems as item, index (item.id ?? index)}
				{#if item.type === 'link'}
					<li>
						{#if $page.route.id === item.id}
							<span class="underline">{item.title}</span>
						{:else}
							<a href={item.id}>{item.title}</a>
						{/if}
					</li>
				{:else if item.type === 'divider'}
					<li style="width: 16px"><hr /></li>
				{/if}
			{/each}
		</ul>
	</aside>

	<slot />
</div>

<style>
	/* Make horizontal */
	ul {
		list-style: none;
		padding: 0;
		/* display: flex; */
		justify-content: center;
		gap: 1em;
	}

	li {
		font-size: 1.2em;
		font-weight: bold;
	}

	li a {
		color: #000;
		text-decoration: none;
	}

	li a:hover {
		text-decoration: underline;
	}

	.underline {
		text-decoration: underline;
	}

	.root {
		display: flex;
		width: 100%;
		height: 100%;
	}

	.left-menu {
		width: 128px;
		padding: 0 2em 0em 0em;
	}
</style>
