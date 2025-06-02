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
			customCss: [
        		'./src/styles/global.css',
      		],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/plantacerium' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/nbZqzwKXGS' }
			],
			sidebar: [
				{
					label: 'Author',
					autogenerate: { directory: 'author' },
				},
				{
					label: 'Portfolio',
					autogenerate: { directory: 'portfolio' },
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
					label: "Java",
					autogenerate: { directory: "java" },
				},
				{
					label: "Golang",
					autogenerate: { directory: "golang" },
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
					label: 'Resources',
					autogenerate: { directory: 'resources' },
				},
			],
			favicon: '/Plantacerium_Panda_favicon.jpg',
			head: [
			  {
				tag: 'link',
				attrs: {
				  rel: 'icon',
				  href: '/Plantacerium_Panda_favicon.jpg',
				  sizes: '150x150',
				},
			  },
			],
		}),
	],
});
