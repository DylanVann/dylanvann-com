import { fontRalewayArray, fontRobotoArray } from './styles'
import Typography from 'typography'
import Theme from 'typography-theme-us-web-design-standards'

delete Theme.googleFonts

const typography = new Typography({
  ...Theme,
  baseFontSize: '20px',
  headerFontFamily: fontRalewayArray,
  bodyFontFamily: fontRobotoArray,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export const rhythm = typography.rhythm
export const scale = typography.scale

export default typography
