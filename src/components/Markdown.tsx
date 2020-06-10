import React from 'react'
import styled from '@emotion/styled'
import { fontRaleway, linkStyle } from '../styles'
import { YouTube } from './YouTube'
import { Caption } from './Caption'
import { Image } from './Image'
import { Quote } from './Quote'
import { Table } from './Table'
import { CodePen } from './CodePen'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const headers: any = {}
for (let i = 1; i <= 6; i++) {
  const el: any = `h${i}`
  headers[el] = styled(el)`
    margin-top: -50px !important;
    padding-top: 50px !important;
    font-family: ${fontRaleway};
  `
}

export const A = styled(`a`)`
  ${linkStyle};
`

const Pre = (p: any) => {
  return (
    <pre
      {...p}
      className={
        p.className === 'language-diff'
          ? 'language-diff diff-highlight'
          : p.className
      }
    />
  )
}

const components = {
  Caption,
  CodePen,
  YouTube,
  // img: Image,
  table: Table,
  a: A,
  pre: Pre,
  quote: Quote,
  ...headers,
}

export const Markdown: React.FC<{ children: string }> = (props) => (
  <MDXProvider components={components}>
    <MDXRenderer>{props.children}</MDXRenderer>
  </MDXProvider>
)
