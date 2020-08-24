/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { PostTitle } from '../components/PostTypography'
import { PostSubTitle } from '../components/PostTypography'

const twoLines = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export default function OgImage(props: any) {
  const {
    pageContext: {
      ogImage: { size },
      title,
      subtitle,
      date,
    },
  } = props
  return (
    <div style={{ ...size, background: '#1e257d', display: 'flex' }}>
      <div
        style={{
          border: '10px solid white',
          margin: 10,
          padding: 20,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          color: 'white !important',
        }}
      >
        <PostTitle
          style={{
            color: 'white',
            fontSize: 81,
            lineHeight: 1.5,
            textAlign: 'left',
          }}
          css={twoLines}
        >
          {title}
        </PostTitle>
        <PostSubTitle
          style={{
            color: 'white',
            fontSize: 54,
            lineHeight: 1.5,
            textAlign: 'left',
          }}
          css={twoLines}
        >
          {subtitle}
        </PostSubTitle>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 36 }}>Dylan Vann - {date}</span>
      </div>
    </div>
  )
}
