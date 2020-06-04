import React from 'react'
import styled from '@emotion/styled'
import { blockStyle } from '../styles'

const Image = ({ className, ...otherProps }: { className: string }) => (
  <img className={className} {...otherProps} />
)

export default styled(Image)`
  ${blockStyle};
  margin: 0;
`
