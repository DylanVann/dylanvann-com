/* eslint-env node */
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { createOpenGraphImage } = require('gatsby-plugin-open-graph-images')
const createPaginatedPages = require('gatsby-paginate')

// eslint-disable-next-line no-unused-vars
const Prism = require('prismjs')
require('prism-svelte')

const BlogIndexPath = path.resolve('src/templates/BlogIndex.tsx')
const BlogPostPath = path.resolve('./src/templates/BlogPost.tsx')
const OgImagePath = path.resolve(`./src/templates/OgImage.tsx`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

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
        allMdx(limit: 1000, sort: { fields: [fields___date], order: DESC }) {
          edges {
            node {
              body
              fields {
                slug
                date(formatString: "MMMM DD, YYYY")
                datetime: date(formatString: "YYYY-MM-DD")
                draft
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
    `,
  )

  if (result.errors) {
    throw new Error(result.errors)
  }

  const allEdges = result.data.allMdx.edges

  const showPost = (edge) => {
    const draft = edge.node.fields.draft
    if (process.env.NODE_ENV === 'production') {
      return !draft
    } else {
      return true
    }
  }

  const postEdges = allEdges.filter(showPost)

  createPaginatedPages({
    edges: postEdges,
    createPage: createPage,
    pageTemplate: BlogIndexPath,
    pageLength: 5,
    context: result.data.site,
  })

  postEdges.forEach(({ node }) => {
    const ogImagePath = `/${node.fields.slug}/og-image.png`
    createPage({
      path: node.fields.slug,
      component: BlogPostPath,
      context: {
        slug: node.fields.slug,
        ogImage: createOpenGraphImage(createPage, {
          path: ogImagePath,
          component: OgImagePath,
          context: {
            title: node.frontmatter.title,
            subtitle: node.frontmatter.subtitle,
            date: node.fields.date,
          },
        }),
      },
    })
  })
}

const getDate = (slug) => {
  const dateRegex = /.*([0-9]{4}-[0-9]{2}-[0-9]{2})-.*/g
  const match = dateRegex.exec(slug)
  return match && match[1]
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const slugWithDate = createFilePath({ node, getNode })
    const date = getDate(slugWithDate)
    const slug = slugWithDate
      .replace(date, '')
      .replace('/posts/-', '')
      .replace('/drafts/-', '')
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
    createNodeField({
      name: `draft`,
      node,
      value: slugWithDate.startsWith('/drafts/'),
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter!
    }
    type MdxFrontmatter {
      github: String
    }
  `)
}
