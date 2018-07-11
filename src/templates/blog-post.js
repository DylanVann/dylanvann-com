import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import ReactRouterPropTypes from 'react-router-prop-types'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css'
import 'prismjs'
import Bio from '../components/Bio'
import Layout from '../components/layout'
import Post from '../components/Post'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.markdownRemark')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const previous = get(this.props, 'pageContext.previous')
    const next = get(this.props, 'pageContext.next')
    return (
      <Layout location={this.props.location}>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Post {...post} />
        <Bio />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </Layout>
    )
  }
}

BlogPostTemplate.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      htmlAst
      frontmatter {
        title
      }
      fields {
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
