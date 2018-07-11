import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { blockStyles } from '../styles'

const VideoGIF = ({ poster, mp4, webm, className }) => (
  <div className={className}>
    <video autoPlay loop muted poster={poster}>
      <source src={mp4} type="video/mp4" />
      <source src={webm} type="video/webm" />
    </video>
  </div>
)

VideoGIF.propTypes = {
  poster: PropTypes.string,
  mp4: PropTypes.string,
  webm: PropTypes.string,
}

const getPercent = ({ ratio }) => {
  const split = ratio.split(':')
  return (split[1] / split[0]) * 100
}

export default styled(VideoGIF)`
  ${blockStyles} position: relative;
  padding-bottom: ${p => `${getPercent(p)}%`};
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background-color: #eee;
  & video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
