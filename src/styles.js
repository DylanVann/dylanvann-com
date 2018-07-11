import { css } from 'emotion'
import { lighten } from 'polished/lib/index'

export const blockStyles = css`
  display: block;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
  margin: 1.53rem auto;
`

export const colorTextDark = '#333'
export const colorTextMuted = '#777'
export const colorTextTitle = lighten(0.1, colorTextDark)
export const fontRaleway = `'Raleway', 'Century Gothic', CenturyGothic, sans-serif`
