import React from 'react'
import styled from 'react-emotion'
import Container from './Container'
import '../styles'

const ContainerContainer = styled('div')`
  flex: 1;
`

const Template = props => (
  <ContainerContainer>
    <Container {...props} />
  </ContainerContainer>
)

export default Template
