/* eslint-env node */
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve('./src/templates/BlogPost.js')

  const result = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
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

  const allEntries = result.data.allMarkdownRemark.edges.map(v => v.node)
  allEntries.forEach(post => {
    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        slug: post.fields.slug,
      },
    })
  })
}

const getDate = slug => {
  const dateRegex = /.*([0-9]{4}-[0-9]{2}-[0-9]{2})-.*/g
  const match = dateRegex.exec(slug)
  return match && match[1]
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slugWithDate = createFilePath({ node, getNode })
    const date = getDate(slugWithDate)
    const slug = slugWithDate.replace(date, '').replace('/posts/-', '')
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
    if (date) {
      createNodeField({
        name: `date`,
        node,
        value: date,
      })
    }
  }
}
