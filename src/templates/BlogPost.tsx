import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { Bio } from '../components/Bio'
import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Post } from '../components/Post'
import { Helmet } from 'react-helmet-async'

const BlogPostTemplate = (props: { location: any; description?: string }) => {
  const post = get(props, 'data.mdx')
  const title = get(post, 'frontmatter.title')
  const description = get(post, 'frontmatter.description')
  const slug = get(post, 'fields.slug')
  const baseUrl =
    process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_URL
  const url = `${baseUrl}/${slug}`
  const ogImageUrl = `${url}/og-image.png`
  return (
    <Layout {...props} title={title} description={description}>
      <Helmet>
        {/* Generic */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        {/* Image */}
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content={description} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Twitter */}
        <meta name="twitter:site" content="@atomarranger" />
        <meta name="twitter:creator" content="@atomarranger" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>
      <Container>
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
