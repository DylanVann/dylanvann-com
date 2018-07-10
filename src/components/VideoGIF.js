import React from 'react'
import PropTypes from 'prop-types'

const VideoGIF = ({ poster, mp4, webm }) => (
  <video autoPlay loop muted poster={poster}>
    <source src={mp4} type="video/mp4" />
    <source src={webm} type="video/webm" />
  </video>
)

VideoGIF.propTypes = {
  poster: PropTypes.string,
  mp4: PropTypes.string,
  webm: PropTypes.string,
}

export default VideoGIF
