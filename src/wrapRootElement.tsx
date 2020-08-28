import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from './mdxComponents'

export const wrapRootElement = ({ element }) => (
  <React.StrictMode>
    <MDXProvider components={mdxComponents}>{element}</MDXProvider>
  </React.StrictMode>
)
