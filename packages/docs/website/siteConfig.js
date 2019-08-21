// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: "DE1 npm package",
  tagline: "A JavaScript Library to control DE1 Espresso Machines",
  url: "http://lukasbombach.de/",
  baseUrl: "/de1/",
  projectName: "de1",
  organizationName: "LukasBombach",
  headerLinks: [
    { doc: "docs", label: "Docs" },
    { doc: "api", label: "API" },
    { blog: false, label: "Blog" }
  ],

  headerIcon: "img/favicon.ico",
  footerIcon: "img/favicon.ico",
  favicon: "img/favicon.ico",
  colors: {
    primaryColor: "#a5894c",
    secondaryColor: "#735f35"
  },
  copyright: `Licensed under MIT`,
  highlight: {
    theme: "default"
  },
  scripts: ["https://buttons.github.io/buttons.js"],
  onPageNav: "separate",
  cleanUrl: true,
  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg"
};

module.exports = siteConfig;
