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

<main class="container">
	<slot />
</main>

<style>
	.container {
		@media (max-width: 640px) {
			/* phones */
			padding: 48px 36px;
		}
		@media (min-width: 640px) {
			/* tablet+ */
			padding: 96px 72px;
		}
	}
</style>
