import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import ghPages from 'rspress-plugin-gh-pages';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [
    ghPages({
      repo: 'https://github.com/plantacerium/plantacerium.github.io',
      branch: 'main',
    }),
  ],
  title: 'Plantacerium Life',
  icon: '/plantacerium-icon.jpg',
  logoText: 'Plantacerium',
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/plantacerium',
      },
    ],
  },
});
