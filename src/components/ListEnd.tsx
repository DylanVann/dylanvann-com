import React from 'react'
import styled from '@emotion/styled'
import { colorTextMuted } from '../styles'

interface ListEndProps {
  className?: string
}

const ListEnd = ({ className }: ListEndProps) => (
  <div className={className}>{`That's all!`}</div>
)

export default styled(ListEnd)`
  text-align: center;
  font-weight: lighter;
  color: ${colorTextMuted};
`
