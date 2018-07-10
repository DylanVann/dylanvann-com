import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import ReactRouterPropTypes from 'react-router-prop-types'
import { graphql } from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import Markdown from '../components/Markdown'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Bio />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.fields.date}</small>
              <Markdown ast={node.htmlAst} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

BlogIndex.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          htmlAst
          fields {
            slug
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
