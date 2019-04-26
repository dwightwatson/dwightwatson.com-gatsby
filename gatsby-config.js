module.exports = {
  siteMetadata: {
    title: `Neon Tsunami`,
    author: `Dwight Watson`,
    description: `A blog on Laravel & Rails.`,
    siteUrl: `https://www.neontsunami.com`,
    social: {
      twitter: `DwightConrad`,
    },
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        ignore: ['github.css']
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-23727271-4',
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Neon Tsunami`,
        short_name: `Neon Tsunami`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4299e1`,
        display: `minimal-ui`,
        icon: `src/images/tsunami.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
  ],
}
