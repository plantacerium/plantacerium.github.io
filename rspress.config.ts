import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Plantacerium Life',
  icon: '/plantacerium-icon.jpg',
  logoText: 'Plantacerium',
  themeConfig: {
    socialLinks: [
      {
        icon: 'discord',
        mode: 'link',
        content: 'https://discord.gg/nbZqzwKXGS',
      },
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/plantacerium',
      },
      
    ],
  },
});
