import { css } from '@emotion/core'
import { lighten, darken } from 'polished'
import 'typeface-raleway'
import 'typeface-roboto'

export const colorTextDark = '#333333'
export const colorTextMuted = '#575757'
export const colorTextTitle = lighten(0.1, colorTextDark)
export const colorTextAccent = '#428bca'

export const blockStyle = css`
  display: block;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
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

export const fontRoboto = fontRobotoArray.join(', ')

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

  pre.diff-highlight > code .token.deleted,
  pre > code.diff-highlight .token.deleted {
    background-color: rgba(255, 0, 0, 0.1);
    color: inherit;
    display: block;
  }

  pre.diff-highlight > code .token.inserted,
  pre > code.diff-highlight .token.inserted {
    background-color: rgba(0, 255, 128, 0.1);
    color: inherit;
    display: block;
  }

  body {
    font-weight: 300;
    background-color: #fcfcfc;
  }

  #___gatsby {
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

  @media only screen and (max-width: 768px) {
    html {
      font-size: 106.25%;
    }
  }

  .gatsby-video,
  .gatsby-resp-image-wrapper {
    ${blockStyle}
  }

  .anchor {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);
    padding-right: 4px;
  }

  .anchor .autolink-header-svg {
    visibility: hidden;
  }

  .anchor:hover .autolink-header-svg {
    visibility: visible;
  }

  h1:hover .autolink-header-svg,
  h2:hover .autolink-header-svg,
  h3:hover .autolink-header-svg,
  h4:hover .autolink-header-svg,
  h5:hover .autolink-header-svg,
  h6:hover .autolink-header-svg {
    visibility: visible;
  }

  .gatsby-highlight {
    margin-bottom: 1.53rem;
  }

  td {
    vertical-align: top;
  }
`
