import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export const Markdown: React.FC<{ children: string }> = (props) => (
  <MDXRenderer>{props.children}</MDXRenderer>
)
