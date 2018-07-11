import React from 'react'
import rehypeReact from 'rehype-react'
import YouTube from './YouTube'
import PropTypes from 'prop-types'
import VideoGIF from './VideoGIF'
import Hidden from './Hidden'
import Processing from './Processing'
import Caption from './Caption'
import Image from './Image'
import styled from 'react-emotion'
import { fontRaleway } from '../styles'
import Quote from './Quote'
import CodePen from './CodePen'

const headers = {}
for (let i = 1; i <= 6; i++) {
  const el = `h${i}`
  headers[el] = styled(el)`
    font-family: ${fontRaleway};
  `
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'image-caption': Caption,
    'code-pen': CodePen,
    youtube: YouTube,
    gif: VideoGIF,
    processing: Processing,
    hidden: Hidden,
    img: Image,
    quote: Quote,
    ...headers,
  },
}).Compiler

const Markdown = ({ ast }) => renderAst(ast)

Markdown.propTypes = {
  ast: PropTypes.object,
}

export default Markdown
