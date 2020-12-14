/* eslint-env node */
require(`dotenv/config`)
const isCI = require('is-ci')

module.exports = {
  siteMetadata: {
    title: `Dylan Vann`,
    author: `Dylan Vann`,
    description: `Dylan Vann's website.`,
    siteUrl: `https://dylanvann.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ['DEPLOY_URL', 'CONTEXT', 'URL'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: `posts`,
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-open-graph-images`,
      options: {
        defaultSize: { width: 1200, height: 630 },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/__generated/*`],
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        // a workaround to solve mdx-remark plugin compat issue
        // https://github.com/gatsbyjs/gatsby/issues/15486
        plugins: [`gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          {
            resolve: `@dylanvann/gatsby-remark-videos`,
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
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },

          {
            resolve: `gatsby-remark-smartypants`,
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg class="autolink-header-svg" aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        prodKey: process.env.SEGMENT_TRACKING_ID,
        trackPage: true,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/typography`,
        omitGoogleFont: true,
      },
    },
  ].filter(Boolean),
}
