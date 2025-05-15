// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://plantacerium.github.io',
	image: {
		service: passthroughImageService(),
	},
	integrations: [
		starlight({
			title: 'Plantacerium Code Zone',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/plantacerium' }],
			sidebar: [
				{
					label: 'Portfolio',
					autogenerate: { directory: 'portfolio' },
				},
				{
					label: 'Contact',
					autogenerate: { directory: 'contact' },
				},
				{
					label: 'Front-End',
					autogenerate: { directory: 'front-end' },
				},
				{
					label: 'Back-End',
					autogenerate: { directory: 'back-end' },
				},
				{
					label: 'Rust',
					autogenerate: { directory: 'rust' },
				},
				{
					label: 'Concepts',
					autogenerate: { directory: 'concepts' },
				},
				{
					label: 'Tools',
					autogenerate: { directory: 'tools' },
				},
				{
					label: 'Snippets',
					autogenerate: { directory: 'snippets' },
				},
				{
					label: "Lore",
					autogenerate: { directory: 'lore' },
				},
			],
			favicon: '/plantacerium-favicon.jpg',
			head: [
			  {
				tag: 'link',
				attrs: {
				  rel: 'icon',
				  href: '/plantacerium-favicon.jpg',
				  sizes: '150x150',
				},
			  },
			],
		}),
	],
});
