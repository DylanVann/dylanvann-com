/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colorTextMuted } from '../styles'

interface CaptionProps {
  children: React.ReactNode
  className?: string
}

export function Caption({ children, className }: CaptionProps) {
  return (
    <small
      css={css`
        display: block;
        color: ${colorTextMuted};
        font-size: inherit;
        margin-bottom: 1.53rem;
        text-align: center;
      `}
      className={className}
    >
      {children}
    </small>
  )
}
