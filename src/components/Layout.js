import React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet'
import '../styles'
import Footer from './Footer'
import TopNav from './TopNav'

const ContainerContainer = styled('div')`
  flex: 1;
`

const getSiteTitle = props => props.data.site.siteMetadata.title

const Template = ({ children, ...props }) => (
  <>
    <Helmet
      title={
        props.title
          ? `${props.title} | ${getSiteTitle(props)}`
          : getSiteTitle(props)
      }
    >
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=A0eaz8BLRR"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png?v=A0eaz8BLRR"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png?v=A0eaz8BLRR"
      />
      <link rel="manifest" href="/site.webmanifest?v=A0eaz8BLRR" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg?v=A0eaz8BLRR"
        color="#202082"
      />
      <link rel="shortcut icon" href="/favicon.ico?v=A0eaz8BLRR" />
      <meta name="apple-mobile-web-app-title" content="Dylan" />
      <meta name="application-name" content="Dylan" />
      <meta name="msapplication-TileColor" content="#202082" />
      <meta name="theme-color" content="#ffffff" />

      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
    </Helmet>
    <TopNav />
    <ContainerContainer>{children}</ContainerContainer>
    <Footer />
  </>
)

export default Template
