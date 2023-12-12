module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'Jeff Sheets',
  siteDescription:
    'Tech briefs and notes by Jeff Sheets',
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  author: 'Jeff Sheets',
  authorEmail: 'jeffsheets@gmail.com',
  authorWebsite: 'https://www.sheetsj.com',
  themeColor: '#1CAF7D', //  Manifest: defines the default theme color for the application
  themeBgColor: '#F3F3F3', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.jpeg', // fallback/default meta image
    opengraph_default_alt: 'sheetsj.com blog', // alt text for default meta image
    twitterSite: '@sheetsj', // i.e. @site - twitter profile of the site
    twitterCreator: '@sheetsj', // i.e. @author -  twitter profile of the site
    mastodonProfile: 'https://hachyderm.io/@jeffsheets' // url to your mastodon instance/profile
  },
  blog: {
    // this is for the rss feed
    name: 'Jeff Sheets - Uncommented Bytes',
    description:
      'Tech briefs and notes by Jeff Sheets'
  },
  pagination: {
    itemsPerPage: 20
  },
  address: {
    email: 'jeffsheets@gmail.com'
  },
  menu: {
    closedText: 'Menu'
  },
  env: process.env.ELEVENTY_ENV,
  umami: {
    websiteId: "68632b69-22b2-4cd1-8327-67c7bf6d737d",
    jsLocation: "https://us.umami.is/script.js",
  }
};
