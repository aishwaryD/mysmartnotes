import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Smart Notes',
  tagline: 'AI Engineering, Simplified',
  // favicon: 'images/favicon.ico',
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
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarItemsGenerator({
            isCategoryIndex: defaultCategoryIndexMatcher,
            defaultSidebarItemsGenerator,
            ...args
          }) {
            return defaultSidebarItemsGenerator({
              ...args,
              isCategoryIndex() {
                return false;
              },
            });
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // plugins: [
  //   [
  //     '@docusaurus/plugin-sitemap',
  //     {
  //       id: 'sitemap', // Assign a unique ID to the plugin instance
  //       changefreq: 'weekly',
  //       priority: 0.5,
  //       ignorePatterns: ['/tags/**'],
  //       filename: 'sitemap.xml',
  //     },
  //   ],
  //   [
  //     '@docusaurus/plugin-content-docs',
  //     {
  //       id: 'cheatsheets',
  //       path: 'cheatsheets',
  //       routeBasePath: 'cheatsheet',
  //       sidebarPath: require.resolve('./sidebars.js'),
  //       sidebarItemsGenerator({
  //         isCategoryIndex: defaultCategoryIndexMatcher,
  //         defaultSidebarItemsGenerator,
  //         ...args
  //       }) {
  //         return defaultSidebarItemsGenerator({
  //           ...args,
  //           isCategoryIndex() {
  //             return false;
  //           },
  //         });
  //       },
  //     },
  //   ],
  //   [
  //     '@docusaurus/plugin-content-docs',
  //     {
  //       id: 'interviewqs',
  //       path: 'interviewqs',
  //       routeBasePath: 'interview-questions',
  //       sidebarPath: require.resolve('./sidebars.js'),
  //       sidebarItemsGenerator({
  //         isCategoryIndex: defaultCategoryIndexMatcher,
  //         defaultSidebarItemsGenerator,
  //         ...args
  //       }) {
  //         return defaultSidebarItemsGenerator({
  //           ...args,
  //           isCategoryIndex() {
  //             return false;
  //           },
  //         });
  //       },
  //     },
  //   ],
  //   '@docusaurus/theme-live-codeblock',//For Docusaurus Live Code Editor. Not for CodeMirror.
  // ],
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  ({
    liveCodeBlock: {
      playgroundPosition: 'bottom', //For Docusaurus Live Code Editor. Not for CodeMirror.
    },
    colorMode: {
      disableSwitch: true,
      defaultMode: 'dark',
    },
    image: 'images/logo-icon.svg',
    navbar: {
      title: 'My Smart Notes',
      logo: {
        alt: 'My Smart Notes',
        src: 'images/logo-icon.svg',
        srcDark: 'images/logo-icon.svg',
      },

      items: [
        {
          to: '/introduction-to-agentic-ai',
          label: 'Explore AI',
          position: 'left',
          activeBaseRegex: '^/$', 
        },
        {
          to: '/agentic-ai-design-patterns',
          position: 'left',
        },
        // {
        //   to: '/introduction-to-machine-learning',
        //   position: 'left',
        // },
        // {
        //   to: '/ml-patterns',
        //   position: 'left',
        // },
      ],

      // items: [
      //   {
      //     type: "dropdown",
      //     label: "Explore AI",
      //     position: "left",
      //     items: [
      //       {
      //         type: "doc",
      //         docId: "categories/Computer Networks/voip",
      //         label: "Computer Networks",
      //       },
      //     ]
      //   },
        // {
        //   type: "dropdown",
        //   label: "Agentic AI",
        //   position: "left",
        //   items: [
        //     {
        //       to: 'cheatsheet/rest-api',
        //       label: 'Backend',
        //       activeBaseRegex: `/cheatsheet/`,
        //     },
        //   ]
        // },
        // {
        //   type: "dropdown",
        //   label: "MLOps",
        //   position: "left",
        //   items: [
        //     {
        //       to: 'interview-questions/most-asked-coding-questions',
        //       label: 'Coding Interview Questions',
        //       activeBaseRegex: `/interview-questions/`,
        //     },
        //   ]
        // },
      // ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} My Smart Notes`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java'],//For Docusaurus Live Code Editor. Not for CodeMirror.
    },
  }),
};

export default config;
