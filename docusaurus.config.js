import { themes as prismThemes } from 'prism-react-renderer';
const subjectPattern=(subject)=>`^/${subject}(?:/|$)`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MySmartNotes',
  tagline: 'Practical guides for software engineers',
  favicon: 'images/logo-icon.svg',
  url: 'https://mysmartnotes.com',
  baseUrl: '/',
  organizationName: 'aishwaryD',
  projectName: 'mysmartnotes',
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'throw',

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
        sitemap: {ignorePatterns: ['/notes/**','/playbooks/**','/workbench','/workbench/','/saved','/saved/','/search','/search/']},
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
        respectPrefersColorScheme: false,
      },
      image: 'images/logo-icon.svg',
      navbar: {
        title: 'mysmartnotes',
        logo: {
          alt: '',
          src: 'images/logo-icon.svg',
          srcDark: 'images/logo-icon.svg',
        },
        items: [

          {
            to: '/dsa',
            activeBaseRegex: subjectPattern('dsa'),
            label: 'DSA',
            position: 'left',
          },

          {
            to: '/system-design',
            activeBaseRegex: subjectPattern('system-design'),
            label: 'System Design',
            position: 'left',
          },
          {
            to: '/ai-native-engineering',
            activeBaseRegex: subjectPattern('ai-native-engineering'),
            label: 'AI-Native Engineering',
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
        darkTheme: prismThemes.oneDark,
        additionalLanguages: ['java'],
      },
    }),
};

export default config;
