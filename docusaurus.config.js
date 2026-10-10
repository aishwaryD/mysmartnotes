import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'mysmartnotes',
  tagline: 'Engineering notes',
  favicon: 'images/logo-icon.svg',
  url: 'https://mysmartnotes.com',
  baseUrl: '/',
  organizationName: 'aishwaryD',
  projectName: 'mysmartnotes',
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: true,
        defaultMode: 'dark',
      },
      image: 'images/logo-icon.svg',
      navbar: {
        title: 'mysmartnotes',
        logo: {
          alt: 'mysmartnotes',
          src: 'images/logo-icon.svg',
          srcDark: 'images/logo-icon.svg',
        },
        items: [
          {
            to: '/dsa',
            label: 'DSA',
            position: 'left',
          },
          {
            to: '/system-design',
            label: 'System Design',
            position: 'left',
          },
          {
            to: '/ai-native-engineering',
            label: 'AI-Native',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} mysmartnotes`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java'],
      },
    }),
};

export default config;
