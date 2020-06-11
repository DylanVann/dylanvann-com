import { fontRaleway } from '../styles'
import styled from '@emotion/styled'

export const headers: any = {}

for (let i = 1; i <= 6; i++) {
  const el: any = `h${i}`
  headers[el] = styled(el)`
    margin-top: -50px !important;
    padding-top: 50px !important;
    font-family: ${fontRaleway};
  `
}
