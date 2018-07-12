import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import ReactRouterPropTypes from 'react-router-prop-types'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css'
import 'prismjs'
import Footer from '../components/Footer'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import Post from '../components/Post'
import TopNav from '../components/TopNav'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.markdownRemark')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const previous = get(this.props, 'pageContext.previous')
    const next = get(this.props, 'pageContext.next')
    return (
      <>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <TopNav />
        <Layout location={this.props.location}>
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
        <Footer />
      </>
    )
  }
}

BlogPostTemplate.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  fragment BlogPost on MarkdownRemark {
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
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...BlogPost
    }
  }
`
