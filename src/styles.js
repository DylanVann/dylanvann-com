import { css } from 'emotion'
import { lighten } from 'polished/lib/index'
import { injectGlobal } from 'emotion'
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css'
import 'prismjs'
import 'typeface-raleway'
import 'typeface-roboto'

export const blockStyles = css`
  display: block;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
  margin: 1.53rem 0;
`

export const colorTextDark = '#333'
export const colorTextMuted = '#777'
export const colorTextTitle = lighten(0.1, colorTextDark)
export const colorTextAccent = '#428bca'

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

export const topNavHeight = 50

export const resetButton = css`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
`

injectGlobal`
* {
    box-sizing: border-box;
}

code[class*="language-"] {
    font-size: inherit;
}

pre[class*="language-"] {
    margin-bottom: 1.53rem;
}

body {
    font-weight: 300;
    background-color: #fcfcfc;
}

#___gatsby {
    padding-top: 50px;
    display:flex;
    flex-direction:column;
    flex-grow:1;
    flex-shrink:1;
    flex-basis:100%;
    min-height: 100vh;
}

// Fix for processing.js inserting a random span.
span[style="position: absolute; left: 0px; opacity: 0; font-family: PjsEmptyFont, fantasy;"] {
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
`
