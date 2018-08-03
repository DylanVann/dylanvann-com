/* eslint-env node */
require('dotenv/config')

module.exports = {
  siteMetadata: {
    title: 'Dylan Vann',
    author: 'Dylan Vann',
    description: "Dylan Vann's website.",
    siteUrl: 'https://dylanvann.com',
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          'gatsby-remark-component',
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
          {
            resolve: '@dylanvann/gatsby-remark-cloudinary',
            options: {
              config: {
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/typography',
      },
    },
  ],
}
