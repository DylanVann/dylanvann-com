/* eslint-env node */
module.exports = {
  siteMetadata: {
    title: 'Dylan Vann',
    author: 'Dylan Vann',
    description: "Dylan Vann's website.",
    siteUrl: 'https://dylanvann.com',
  },
  pathPrefix: '/gatsby-starter-blog',
  plugins: [
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
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              ignoreFileExtensions: [],
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-56980425-1`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/typography',
      },
    },
  ],
}
