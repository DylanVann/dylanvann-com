import React from 'react'
import { blockStyle } from '../styles'
import { IS_SSR } from '../config'

const added = false

interface CodePenProps {
  id: string
  className?: string
}

export function CodePen(props: CodePenProps) {
  React.useEffect(() => {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://static.codepen.io/assets/embed/ei.js'
    if (!IS_SSR && !added) {
      document.body.appendChild(s)
    }
  })
  const height = 512
  return (
    <div
      css={[blockStyle, { display: 'block', height, width: '100%' }]}
      className={props.className}
    >
      <p
        data-height={height}
        data-theme-id="light"
        data-slug-hash={props.id}
        data-default-tab="result"
        data-user="dylanvann"
        data-pen-title="Custom Animated Google Maps Markers"
        data-preview="true"
        className="codepen"
      >
        <noscript>
          See the Pen{' '}
          <a href={`https://codepen.io/dylanvann/pen/${props.id}/`}>
            Custom Animated Google Maps Markers
          </a>{' '}
          by Dylan Vann (<a href="https://codepen.io/dylanvann">@dylanvann</a>)
          on <a href="https://codepen.io">CodePen</a>.
        </noscript>
      </p>
    </div>
  )
}
