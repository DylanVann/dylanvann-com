import styled from 'react-emotion'
import { rhythm } from '../typography'

const Container = styled('div')`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(26)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  flex: 1;
`

export default Container
