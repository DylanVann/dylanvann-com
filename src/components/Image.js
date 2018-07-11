import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { blockStyles } from '../styles'

const Image = ({ className, ...otherProps }) => (
  <img className={className} {...otherProps} />
)

Image.propTypes = {
  className: PropTypes.string,
}

export default styled(Image)`
  ${blockStyles};
`
