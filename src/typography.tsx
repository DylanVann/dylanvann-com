import { fontRalewayArray, fontRobotoArray } from './styles'
import Typography from 'typography'
import Theme from 'typography-theme-us-web-design-standards'

const typography = new Typography({
  ...Theme,
  baseFontSize: '20px',
  headerFontFamily: fontRalewayArray,
  bodyFontFamily: fontRobotoArray,
})

export const { scale, rhythm, options } = typography
export default typography
