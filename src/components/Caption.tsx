import React from 'react'
import { colorTextMuted } from '../styles'
import styled from '@emotion/styled'

interface CaptionProps {
  children: React.ReactNode
  className?: string
}

function Caption({ children, className }: CaptionProps) {
  return <small className={className}>{children}</small>
}

export default styled(Caption)`
  display: block;
  color: ${colorTextMuted};
  font-size: inherit;
  margin-bottom: 1.53rem;
  text-align: center;
`
