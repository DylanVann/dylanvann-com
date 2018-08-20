import React from 'react'
import { css } from '@emotion/core'
import { blockStyle } from '../styles'

const containerStyle = css`
  ${blockStyle};
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

interface YouTubeProps {
  id: string
  className?: string
}

const YouTube = ({ id }: YouTubeProps) => (
  <div css={containerStyle}>
    <iframe
      width={560}
      height={420}
      src={`https://www.youtube.com/embed/${id}?color=white&theme=dark&wmode=opaque&rel=0&showinfo=0`}
      frameBorder="0"
      allowFullScreen
    />
  </div>
)

export default YouTube
