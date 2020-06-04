import React from 'react'
import { Helmet } from 'react-helmet'
// @ts-ignore
import ProfileImage from './ProfileImage.jpg'
import '../styles'

export const Meta = (props: { title?: string }) => (
  <Helmet>
    <title>{props.title ? `${props.title} | Dylan Vann` : 'Dylan Vann'}</title>
    <html lang="en" />
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
    <meta name="author" content="Dylan Vann" />
    <meta name="description" content="Dylan Vann's website." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Dylan Vann" />
    <meta property="og:url" content="https://dylanvann.com/" />
    <meta property="og:description" content="Software developer." />
    <meta property="og:image" content={ProfileImage} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@atomarranger" />
    <meta name="twitter:creator" content="@atomarranger" />
  </Helmet>
)
