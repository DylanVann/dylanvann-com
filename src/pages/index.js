import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Container from '../components/Container'
import Layout from '../components/Layout'
import Post from '../components/Post'

const BlogIndex = ({ posts, ...props }) => (
  <Layout {...props}>
    <Container>
      {posts.map(({ node }) => <Post key={node.fields.slug} {...node} />)}
    </Container>
  </Layout>
)

const getPosts = props => get(props, 'data.allMarkdownRemark.edges') || []

const Mapped = props => <BlogIndex posts={getPosts(props)} {...props} />

export default Mapped

export const pageQuery = graphql`
  query IndexQuery {
    ...SiteMeta
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/.*posts.*/" } }
    ) {
      edges {
        node {
          ...BlogPost
        }
      }
    }
  }
`
