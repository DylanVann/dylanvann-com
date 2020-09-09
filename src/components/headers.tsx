import { fontRaleway } from '../styles'
import styled from '@emotion/styled'

export const headers: any = {}

for (let i = 1; i <= 6; i++) {
  const el: any = `h${i}`
  headers[el] = styled(el)`
    font-family: ${fontRaleway};
  `
}
