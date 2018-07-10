import React from 'react'
import 'processing-js/processing.min.js'
import PropTypes from 'prop-types'

class Processing extends React.PureComponent {
  el = undefined
  componentDidMount() {
    const { source } = this.props
    window.Processing.loadSketchFromSources(this.canvas, [source])
  }
  render() {
    return (
      <div>
        <canvas width="100" height="100" ref={el => this.canvas = el} />
      </div>
    )
  }
}

Processing.propTypes = {
  source: PropTypes.string.isRequired,
}

export default Processing
