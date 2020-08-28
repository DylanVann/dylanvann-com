import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { Bio } from '../components/Bio'
import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Post } from '../components/Post'
import { TopNav } from '../components/TopNav'

const BlogPostTemplate = (props: { location: any; description?: string }) => {
  const post = get(props, 'data.mdx')
  const title = get(post, 'frontmatter.title')
  const description = get(post, 'frontmatter.description')
  return (
    <Layout {...props} title={title} description={description}>
      <Container>
        <TopNav />
        <Post {...post} />
        <hr />
        <Bio />
      </Container>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  fragment BlogPost on Mdx {
    body
    fields {
      slug
      date(formatString: "MMMM DD, YYYY")
    }
    frontmatter {
      title
      description
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
    mdx(fields: { slug: { eq: $slug } }) {
      ...BlogPost
    }
  }
`
