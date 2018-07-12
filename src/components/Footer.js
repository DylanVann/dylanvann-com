import React from 'react'
import styled from 'react-emotion'
import { colorTextMuted } from '../styles'
import Container from './Container'

const BG = styled('div')`
  line-height: 39px;
  text-align: center;
  background: #e7e7e7;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledContainer = styled(Container)`
  margin: 0;
  padding: 10px 0;
  color: ${colorTextMuted};
`

const Footer = () => (
  <BG>
    <StyledContainer>© 2018 Dylan Vann</StyledContainer>
  </BG>
)

export default Footer
