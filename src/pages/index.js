import React from 'react'
import get from 'lodash/get'
import ReactRouterPropTypes from 'react-router-prop-types'
import { graphql } from 'gatsby'
import Container from '../components/Container'
import Layout from '../components/Layout'
import Post from '../components/Post'

class BlogIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    return (
      <Layout {...this.props}>
        <Container>
          {posts.map(({ node }) => <Post {...node} key={node.fields.slug} />)}
        </Container>
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
    ...SiteMeta
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/.*blog.*/" } }
    ) {
      edges {
        node {
          ...BlogPost
        }
      }
    }
  }
`
