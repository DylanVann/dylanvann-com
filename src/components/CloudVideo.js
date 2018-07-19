import React from 'react'
import styled from 'react-emotion'
import { blockStyles } from '../styles'
import renderVideoTagString from './renderVideoTagString'

const CloudVideo = ({ className, srcvideo, srcvideoposter }) => (
  <span className={className}>
    <span
      dangerouslySetInnerHTML={{
        __html: renderVideoTagString({
          srcVideo: srcvideo,
          srcVideoPoster: srcvideoposter,
        }),
      }}
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