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
    { doc: "getting-started", label: "Get Started" },
    { doc: "getting-started", label: "Guides" },
    { doc: "api", label: "API Reference" },
    { href: "https://github.com/", label: "GitHub" }
  ],

  headerIcon: "img/espresso.png",
  footerIcon: "img/espresso.png",
  favicon: "img/espresso.png",
  colors: {
    primaryColor: "#FFC899",
    secondaryColor: "#18A0FB"
  },
  copyright: `Made by Lukas Bombach. Licensed under MIT`,
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
