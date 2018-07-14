import React from 'react'
import Container from '../components/Container'
import Layout from '../components/Layout'
import { PostSubTitle, PostTitle } from '../components/PostTypography'
import { graphql } from 'gatsby'

const NotFoundPage = props => (
  <Layout {...props} title="Not Found">
    <Container>
      <PostTitle>NOT FOUND</PostTitle>
      <PostSubTitle>Nothing exists here. Except this page.</PostSubTitle>
    </Container>
  </Layout>
)

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPage {
    ...SiteMeta
  }
`
