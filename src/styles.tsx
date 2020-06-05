import { css } from '@emotion/core'
import { lighten, darken } from 'polished'
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css'
import 'typeface-raleway'
import 'typeface-roboto'

export const colorTextDark = '#333333'
export const colorTextMuted = '#575757'
export const colorTextTitle = lighten(0.1, colorTextDark)
export const colorTextAccent = '#428bca'

export const blockStyle = css`
  display: block;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
  margin: 1.53rem auto;
`

export const linkStyle = css`
  text-decoration: none;
  color: ${colorTextAccent};
  :visited {
    color: ${darken(0.2, colorTextAccent)};
  }
`

export const fontRalewayArray = [
  'Raleway',
  'Century Gothic',
  'CenturyGothic',
  'sans-serif',
]
export const fontRaleway = fontRalewayArray.join(', ')

export const fontRobotoArray = [
  'Roboto',
  'Helvetica Neue',
  'Helvetica',
  'Arial',
  'sans-serif',
]

export const topNavHeight = 50

export const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  .token.inserted {
    border-bottom: none !important;
  }

  .token.deleted {
    text-decoration: none !important;
  }

  code[class*='language-'] {
    font-size: inherit;
  }

  pre[class*='language-'] {
    margin-bottom: 1.53rem;
  }

  body {
    font-weight: 300;
    background-color: #fcfcfc;
  }

  #___gatsby {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 100%;
    min-height: 100vh;
  }

  #___gatsby > div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  #gatsby-noscript {
    display: none;
  }

  // Fix for processing.js inserting a random span.
  span[style='position: absolute; left: 0px; opacity: 0; font-family: PjsEmptyFont, fantasy;'] {
    display: none;
  }

  // Fix for nav covering header when an anchor is clicked.
  h2[id] {
    margin-top: -${topNavHeight}px;
    padding-top: ${topNavHeight}px;
  }

  @media only screen and (max-width: 768px) {
    html {
      font-size: 106.25%;
    }
  }

  .gatsby-video,
  .gatsby-resp-image-wrapper {
    ${blockStyle}
  }

  .anchor.before {
    top: 50px;
  }
`
