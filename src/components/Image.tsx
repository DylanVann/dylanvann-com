import React from 'react'
import styled from '@emotion/styled'
import { blockStyle } from '../styles'

const ImageBase = ({ className, ...otherProps }: { className: string }) => (
  <img className={className} {...otherProps} />
)

export const Image = styled(ImageBase)`
  ${blockStyle};
  margin: 0;
`
