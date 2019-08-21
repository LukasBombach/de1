// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: "DE1 npm package",
  tagline: "A JavaScript Library to control DE1 Espresso Machines",
  url: "http://lukasbombach.de/",
  baseUrl: "/",
  projectName: "de1",
  organizationName: "LukasBombach",
  headerLinks: [
    { doc: "getting-started", label: "Docs" },
    { doc: "api", label: "API" },
    { blog: false, label: "Blog" }
  ],

  headerIcon: "img/espresso.png",
  footerIcon: "img/espresso.png",
  favicon: "img/espresso.png",
  colors: {
    primaryColor: "#323039",
    secondaryColor: "#18A0FB"
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
