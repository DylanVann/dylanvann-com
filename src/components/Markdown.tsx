import React from 'react'
import rehypeReact from 'rehype-react'
import styled from '@emotion/styled'
import { fontRaleway, linkStyle } from '../styles'
import { YouTube } from './YouTube'
import { Caption } from './Caption'
import { Image } from './Image'
import { Quote } from './Quote'
import { Table } from './Table'
import { CodePen } from './CodePen'

const headers: any = {}
for (let i = 1; i <= 6; i++) {
  const el: any = `h${i}`
  headers[el] = styled(el)`
    font-family: ${fontRaleway};
  `
}

export const A = styled(`a`)`
  ${linkStyle};
`

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'image-caption': Caption,
    'code-pen': CodePen,
    'youtube-video': YouTube,
    table: Table,
    img: Image,
    a: A,
    quote: Quote,
    ...headers,
  },
}).Compiler

export const Markdown = ({ ast }: { ast: any }) => renderAst(ast)
