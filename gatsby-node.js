/* eslint-env node */
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve('./src/templates/blog-post.js')

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw new Error(result.errors)
  }

  // Create blog posts pages.
  const allEntries = result.data.allMarkdownRemark.edges.map(v => v.node)
  const posts = allEntries.filter(e => e.fields.slug.startsWith('/blog/'))
  const pages = allEntries.filter(e => !e.fields.slug.startsWith('/blog/'))

  pages.forEach(page => {
    createPage({
      path: page.fields.slug,
      component: blogPost,
      context: {
        slug: page.fields.slug,
      },
    })
  })

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        slug: post.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}