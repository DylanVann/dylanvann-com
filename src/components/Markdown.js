import React from 'react'
import rehypeReact from 'rehype-react'
import YouTube from './YouTube'
import PropTypes from 'prop-types'
import VideoGIF from './VideoGIF'
import Hidden from './Hidden'
import Processing from './Processing';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    youtube: YouTube,
    gif: VideoGIF,
    processing: Processing,
    hidden: Hidden,
  },
}).Compiler

const Markdown = ({ ast }) => renderAst(ast)

Markdown.propTypes = {
  ast: PropTypes.object,
}

export default Markdown
