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
        name: `posts`,
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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-23727271-4",
      },
    },
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
  ],
}
