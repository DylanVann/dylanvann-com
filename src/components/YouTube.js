import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

const containerClass = css`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background-color: #eee;
  & iframe,
  .embed-container object,
  .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const YouTube = ({ id }) => (
  <div className={containerClass}>
    <iframe
      width={560}
      height={420}
      src={`https://www.youtube.com/embed/${id}?color=white&theme=dark&wmode=opaque&rel=0&showinfo=0`}
      frameBorder="0"
      allowFullScreen
    />
  </div>
)

YouTube.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default YouTube
