import React from 'react'
import { blockStyles } from '../styles'
import { IS_SSR } from '../config'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

let added = false

class CodePen extends React.PureComponent {
  componentDidMount() {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://static.codepen.io/assets/embed/ei.js'
    if (!IS_SSR && !added) {
      document.body.appendChild(s)
    }
  }
  render() {
    const { id, className } = this.props
    const height = 512
    return (
      <div
        style={{ display: 'block', height, width: '100%' }}
        className={className}
      >
        <p
          data-height={height}
          data-theme-id="light"
          data-slug-hash={id}
          data-default-tab="result"
          data-user="dylanvann"
          data-pen-title="Custom Animated Google Maps Markers"
          data-preview="true"
          className="codepen"
        >
          <noscript>
            See the Pen{' '}
            <a href={`https://codepen.io/dylanvann/pen/${id}/`}>
              Custom Animated Google Maps Markers
            </a>{' '}
            by Dylan Vann (<a href="https://codepen.io/dylanvann">@dylanvann</a>
            ) on <a href="https://codepen.io">CodePen</a>.
          </noscript>
        </p>
      </div>
    )
  }
}

CodePen.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default styled(CodePen)`
  ${blockStyles};
`
