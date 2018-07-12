import React from 'react'
import Helmet from 'react-helmet'
import ReactRouterPropTypes from 'react-router-prop-types'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Footer from '../components/Footer'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import Post from '../components/Post'
import TopNav from '../components/TopNav'
import { DiscussionEmbed } from 'disqus-react'
import { IS_SSR } from '../config'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.markdownRemark')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const title = get(post, 'frontmatter.title')
    const disqusShortname = 'dylanvann'
    const url =
      !IS_SSR &&
      window.location.href.replace(
        'http://localhost:8000',
        'https://dylanvann.com'
      )
    const disqusConfig = {
      url,
      identifier: url,
      title,
    }
    return (
      <>
        <Helmet title={`${title} | ${siteTitle}`} />
        <TopNav />
        <Layout location={this.props.location}>
          <Post {...post} />
          <Bio />
          {!IS_SSR && (
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          )}
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
