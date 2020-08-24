/** @jsx jsx */
import { jsx } from '@emotion/core'
import { PostTitle } from '../components/PostTypography'
import { PostSubTitle } from '../components/PostTypography'
import capsize from 'capsize'

const fontMetrics = {
  capHeight: 710,
  ascent: 940,
  descent: -234,
  lineGap: 0,
  unitsPerEm: 1000,
}

const textStyle = {
  color: 'white !important',
  textAlign: 'left',
  margin: 0,
} as const

// Needed to prevent descenders getting cut off.
const TwoLines = (props: any) => (
  <span
    css={{
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }}
    {...props}
  />
)

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
    <div css={{ ...size, background: '#1e257d', display: 'flex' }}>
      <div
        css={{
          margin: 20,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          color: 'white !important',
        }}
      >
        <PostTitle
          css={{
            ...textStyle,
            ...capsize({
              fontMetrics,
              capHeight: 59,
              lineGap: 21,
            }),
            textDecoration: 'underline',
          }}
        >
          <TwoLines>{title}</TwoLines>
        </PostTitle>
        <PostSubTitle
          css={{
            ...textStyle,
            ...capsize({
              fontMetrics,
              capHeight: 41,
              lineGap: 13,
            }),
          }}
        >
          <TwoLines>{subtitle}</TwoLines>
        </PostSubTitle>
        <div css={{ flex: 1 }} />
        <span
          css={{
            ...textStyle,
            ...capsize({
              fontMetrics,
              capHeight: 26,
              lineGap: 12,
            }),
          }}
        >
          Dylan Vann - {date}
        </span>
      </div>
    </div>
  )
}
