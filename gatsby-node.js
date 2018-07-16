/* eslint-env node */
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve('./src/templates/BlogPost.js')

  // language=GraphQL
  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            title
            author
          }
        }
        allMarkdownRemark(
          limit: 1000
          sort: { fields: [fields___date], order: DESC }
        ) {
          edges {
            node {
              htmlAst
              fields {
                slug
                date(formatString: "MMMM DD, YYYY")
              }
              frontmatter {
                title
                subtitle
                github
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

  const allEdges = result.data.allMarkdownRemark.edges

  const showPost = post => {
    const slug = post.node.fields.slug
    if (process.env.NODE_ENV === 'production') {
      return slug.startsWith('/posts/')
    } else {
      return slug.startsWith('/posts/') || slug.startsWith('/drafts/')
    }
  }

  const postEdges = allEdges.filter(showPost)

  createPaginatedPages({
    edges: postEdges,
    createPage: createPage,
    pageTemplate: 'src/templates/BlogIndex.js',
    pageLength: 5,
    context: result.data.site,
  })

  postEdges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPost,
      context: {
        slug: node.fields.slug,
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
