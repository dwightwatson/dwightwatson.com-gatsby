module.exports = {
  siteMetadata: {
    title: `Dwight Watson's blog`,
    author: `Dwight Watson`,
    description: `A blog on Laravel & Rails.`,
    siteUrl: `https://www.dwightwatson.com`,
    social: {
      twitter: `DwightConrad`,
      github: `dwightwatson`,
    },
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-prismjs`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-23727271-4",
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dwight Watson`,
        short_name: `Dwight Watson`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4299e1`,
        display: `minimal-ui`,
        icon: `src/images/tsunami.png`,
      },
    },
    // `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
  ],
}
