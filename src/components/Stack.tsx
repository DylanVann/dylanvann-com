/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FC } from 'react'

export const Stack: FC<any> = ({ gap = 1, ...props }) => (
  <div
    {...props}
    sx={{
      display: 'grid',
      gridGap: gap,
    }}
  />
)
