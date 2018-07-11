import React from 'react'
import PropTypes from 'prop-types'

if (typeof window !== 'undefined') {
  require('processing-js/processing.min.js')
}

const listenersMap = new Map()

window.addEventListener(
  'resize',
  () => {
    listenersMap.forEach(cb => cb())
  },
  true
)

class Processing extends React.PureComponent {
  canvas = undefined

  componentDidMount() {
    const { source } = this.props
    const container = this.canvas.parentNode
    const resize = () =>
      this.canvas.setAttribute('width', container.offsetWidth)
    window.Processing.loadSketchFromSources(this.canvas, [source], () => {
      resize()
    })
    listenersMap.set(this.canvas, resize)
  }

  componentWillUnmount() {
    listenersMap.delete(this.canvas)
  }

  render() {
    return (
      <div>
        <canvas width="100" height="100" ref={el => (this.canvas = el)} />
      </div>
    )
  }
}

Processing.propTypes = {
  source: PropTypes.string.isRequired,
}

export default Processing
