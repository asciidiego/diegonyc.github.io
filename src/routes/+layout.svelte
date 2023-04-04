<script lang="ts">
	import { page } from '$app/stores';
	import './styles.css';

	type MenuLink = {
		type: 'link';
		id: string;
		title: string;
	};
	type MenuDivider = {
		id: string;
		type: 'divider';
	};
	type MenuItem = MenuLink | MenuDivider;

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
			type: 'divider',
			id: 'divider-1'
		},
		{
			type: 'link',
			id: 'https://twitter.com/asciidiego',
			title: 'Twitter'
		}
	];
</script>

<header style="text-align: center">
	<h1>Diego Rodriguez</h1>
	<ul>
		{#each menuItems as item (item.id)}
			{#if item.type === 'link'}
				<li>
					{#if $page.route.id === item.id}
						{item.title}
					{:else}
						<a href={item.id}>{item.title}</a>
					{/if}
				</li>
			{:else if item.type === 'divider'}
				<li style="font-weight: normal; color: #00000066;">•</li>
			{/if}
		{/each}
	</ul>
</header>

<slot />

<style>
	/* Make horizontal */
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		gap: 1em;
	}

	li {
		font-size: 1.2em;
		font-weight: bold;
	}

	li a {
		color: #00000066;
		text-decoration: none;
	}

	li a:hover {
		text-decoration: underline;
	}
</style>
