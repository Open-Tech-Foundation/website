// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "OPEN TECH FOUNDATION",
  tagline: "- An initiative to standardize OSS libraries. [*CURRENT FOCUS]",
  url: "https://open-tech-foundation.pages.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/Logo.svg",
  organizationName: "open-tech-foundation", // Usually your GitHub org/user name.
  projectName: "website", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-GMFYD0V12G",
          anonymizeIP: true,
        },
        sitemap: {
          filename: "sitemap.xml",
          changefreq: null,
          priority: null,
          lastmod: "date",
          ignorePatterns: ["/tags/**"],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Open Tech Foundation",
        logo: {
          alt: "Open Tech Foundation Logo",
          src: "img/Logo.svg",
        },
        items: [
          { to: "/blog", label: "Blog", position: "left" },
          {
            to: "/contribute",
            position: "right",
            html: `<div class="contribute">CONTRIBUTE <div class="heart">❤️</div></div>`,
          },
          {
            href: "https://github.com/open-tech-foundation",
            className: "header-github-link",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            html: `
            <div>
                Built with 
                <a href="https://docusaurus.io/" target="_blank" rel="noreferrer noopener" aria-label="Built with docusaurus">
                  <img style="vertical-align:middle" src="https://d33wubrfki0l68.cloudfront.net/c088b7acfcf11100903c44fe44f2f2d7e0f30531/47727/img/docusaurus.svg" alt="Deploys by Cloudflare Pages" width="32" height="32" />
                </a>
                Deploys by 
                <a href="https://pages.cloudflare.com/" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Cloudflare Pages">
                  <img style="vertical-align:middle" src="https://pages.cloudflare.com/resources/logo/logo.svg" alt="Deploys by Cloudflare Pages" width="32" height="32" />
                </a>
            </div>`,
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://github.com/open-tech-foundation">Open Tech Foundation</a>.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),
};

module.exports = config;
