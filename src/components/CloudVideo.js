import React from 'react'
import styled from 'react-emotion'
import { blockStyles } from '../styles'
import { ReactVideoTag } from 'react-video-tag'

const CloudVideo = ({ className, srcvideo, srcvideoposter }) => (
  <span className={className}>
    <ReactVideoTag
      src={srcvideo}
      poster={srcvideoposter}
      muted
      autoPlay
      playsInline
      loop
    />
  </span>
)

export default styled(CloudVideo)`
    position: relative;
    display: block;
    width: 100%;
    max-width: ${p => p.presentationwidth}px;
    margin-left: auto;
    margin-right: auto;
    span {
        padding-bottom: ${p => p.paddingbottom};
        position: relative;
        bottom: 0;
        left: 0;
        background-size: cover;
        display: block;
        background-image: url('${p => p.base64}');
    }
    video {
        width: 100%;
        height: 100%;
        margin: 0;
        vertical-align: middle;
        position: absolute;
        top: 0;
        left: 0;
    }
    ${blockStyles};
}
`
