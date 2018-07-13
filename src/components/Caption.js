import React from 'react'
import PropTypes from 'prop-types'
import { colorTextMuted } from '../styles'
import styled from 'react-emotion'

const Caption = ({ children, className }) => (
  <small className={className}>{children}</small>
)

Caption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default styled(Caption)`
  display: block;
  color: ${colorTextMuted};
  font-size: inherit;
  margin-bottom: 1.53rem;
`
