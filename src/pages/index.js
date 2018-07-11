import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import ReactRouterPropTypes from 'react-router-prop-types'
import { graphql } from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/layout'
import Post from '../components/Post'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Bio />
        {posts.map(({ node }) => <Post {...node} key={node.fields.slug} />)}
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
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/.*blog.*/" } }
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
          }
        }
      }
    }
  }
`
