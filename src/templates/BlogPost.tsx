import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { Bio } from '../components/Bio'
import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Post } from '../components/Post'
import { TopNav } from '../components/TopNav'
import { DiscussionEmbed } from 'disqus-react'
import { IS_SSR } from '../config'

const BlogPostTemplate = (props: { location: any }) => {
  const post = get(props, 'data.markdownRemark')
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
    <Layout {...props} title={title}>
      <Container>
        <TopNav />
        <Post {...post} />
        <Bio />
        {!IS_SSR && (
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        )}
      </Container>
    </Layout>
  )
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
  fragment SiteMeta on Query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
  query BlogPostBySlug($slug: String!) {
    ...SiteMeta
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...BlogPost
    }
  }
`
