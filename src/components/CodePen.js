import React from 'react'
import { blockStyles } from '../styles'
import styled from 'react-emotion'

class CodePen extends React.PureComponent {
  componentDidMount() {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://static.codepen.io/assets/embed/ei.js'
    this.instance.appendChild(s)
  }
  render() {
    const { id, className } = this.props
    return (
      <div className={className}>
        <p
          ref={el => (this.instance = el)}
          data-height="562"
          data-theme-id="18104"
          data-slug-hash={id}
          data-default-tab="result"
          data-user="dylanvann"
          className="codepen"
        >
          See the <a href={`http://codepen.io/dylanvann/pen/${id}/`}>Pen</a> by
          Dylan Vann (<a href="http://codepen.io/dylanvann">@dylanvann</a>) on{' '}
          <a href="http://codepen.io">CodePen</a>.
        </p>
      </div>
    )
  }
}

export default styled(CodePen)`
  iframe {
    ${blockStyles};
  }
`
