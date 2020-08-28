import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export function Markdown({ children = '' }: { children: string }) {
  return <MDXRenderer>{children}</MDXRenderer>
}
