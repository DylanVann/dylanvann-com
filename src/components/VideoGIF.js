import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { blockStyles } from '../styles'

// React does not render the <video> element correctly.
// https://github.com/facebook/react/issues/6544
const renderToString = ({ poster, mp4 }) => `
<video muted autoplay playsinline loop poster="${poster}">
  <source src="${mp4}" type="video/mp4">
</video>
`

const VideoGIF = ({ className, ...props }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: renderToString(props) }}
  />
)

VideoGIF.propTypes = {
  poster: PropTypes.string,
  mp4: PropTypes.string,
  className: PropTypes.string,
}

const getDimensions = ({ ratio }) => {
  const split = ratio.split(':')
  return {
    width: split[0],
    height: split[1],
  }
}

const getWidth = props => getDimensions(props).width

export default styled(VideoGIF)`
  & video {
    background-color: #eee;
    ${blockStyles};
    max-width: 100%;
    width: ${p => p.width || getWidth(p)}px;
    height: auto;
  }
`
