<script>
	import { page } from '$app/stores';
	import './styles.css';

	const routes = [
		{
			id: '/',
			title: 'Home'
		},
		{
			id: '/essays',
			title: 'Essays'
		}
	];
</script>

<header style="text-align: center">
	<h1>Diego Rodriguez</h1>
	<ul>
		{#each routes as route (route.id)}
			<li>
				{#if $page.route.id === route.id}
					{route.title}
				{:else}
					<a href={route.id}>{route.title}</a>
				{/if}
			</li>
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
