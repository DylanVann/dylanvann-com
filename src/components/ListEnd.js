import React from 'react'
import styled from 'react-emotion'
import { colorTextMuted } from '../styles'

const ListEnd = ({ className }) => (
  <div className={className}>{`That's all!`}</div>
)

export default styled(ListEnd)`
  text-align: center;
  font-weight: light;
  color: ${colorTextMuted};
`
