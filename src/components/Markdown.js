import React from 'react'
import rehypeReact from 'rehype-react'
import YouTube from './YouTube'
import PropTypes from 'prop-types'
import Caption from './Caption'
import Image from './Image'
import styled from 'react-emotion'
import { fontRaleway, linkStyles, blockStyles } from '../styles'
import Quote from './Quote'
import CodePen from './CodePen'
import { FastImage } from 'react-fast-image'
import { css } from 'emotion'

const headers = {}
for (let i = 1; i <= 6; i++) {
  const el = `h${i}`
  headers[el] = styled(el)`
    font-family: ${fontRaleway};
  `
}

export const A = styled(`a`)`
  ${linkStyles};
`

const cssImage = css`
  ${blockStyles};
  max-width: 100%;
`

const FastImageTag = ({
  imgsrc,
  imgwebpsrc,
  imgsrcset,
  imgwebpsrcset,
  videosrc,
  videopostersrc,
  videoposterwebpsrc,
  videoposterbase64,
  height,
  width,
}) => (
  <FastImage
    className={cssImage}
    imgSrc={imgsrc}
    imgWebPSrc={imgwebpsrc}
    imgWebPSrcSet={imgwebpsrcset}
    imgSrcSet={imgsrcset}
    videoSrc={videosrc}
    videoPosterSrc={videopostersrc}
    videoPosterWebPSrc={videoposterwebpsrc}
    videoPosterBase64={videoposterbase64}
    width={Number(width)}
    height={Number(height)}
  />
)

FastImageTag.propTypes = {
  imgsrc: PropTypes.string,
  imgwebpsrc: PropTypes.string,
  imgsrcset: PropTypes.string,
  imgwebpsrcset: PropTypes.string,
  videosrc: PropTypes.string,
  videopostersrc: PropTypes.string,
  videoposterwebpsrc: PropTypes.string,
  videoposterbase64: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'image-caption': Caption,
    'code-pen': CodePen,
    'fast-image': FastImageTag,
    'youtube-video': YouTube,
    img: Image,
    a: A,
    quote: Quote,
    ...headers,
  },
}).Compiler

const Markdown = ({ ast }) => renderAst(ast)

Markdown.propTypes = {
  ast: PropTypes.object,
}

export default Markdown
