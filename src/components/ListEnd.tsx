import React from 'react'
import styled from '@emotion/styled'
import { colorTextMuted } from '../styles'

interface ListEndProps {
  className?: string
}

const ListEndBase = ({ className }: ListEndProps) => (
  <div className={className}>{`That's all!`}</div>
)

export const ListEnd = styled(ListEndBase)`
  text-align: center;
  font-weight: lighter;
  color: ${colorTextMuted};
`
