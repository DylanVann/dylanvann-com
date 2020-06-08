/* eslint-env node */
require(`dotenv/config`)

module.exports = {
  siteMetadata: {
    title: `Dylan Vann`,
    author: `Dylan Vann`,
    description: `Dylan Vann's website.`,
    siteUrl: `https://dylanvann.com`,
  },
  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-component`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-videos`,
            options: {
              pipelines: [
                {
                  name: `h264`,
                  transcode: (chain) =>
                    chain
                      .videoCodec(`libx264`)
                      .noAudio()
                      .outputOptions([`-b:v 0`, `-crf 25`]),
                  maxHeight: 1000,
                  maxWidth: 750,
                  fileExtension: `mp4`,
                },
              ],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
            },
          },
          `gatsby-remark-copy-linked-files`,
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
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/typography`,
      },
    },
  ],
}
