import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { colorTextMuted } from '../styles'

const ListEnd = ({ className }) => (
  <div className={className}>{`That's all!`}</div>
)

ListEnd.propTypes = {
  className: PropTypes.string,
}

export default styled(ListEnd)`
  text-align: center;
  font-weight: light;
  color: ${colorTextMuted};
`
