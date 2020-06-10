import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { headers } from './src/components/headers'
import { A } from './src/components/A'
import { YouTube } from './src/components/YouTube'
import { Caption } from './src/components/Caption'
import { Image } from './src/components/Image'
import { Quote } from './src/components/Quote'
import { Table } from './src/components/Table'
import { CodePen } from './src/components/CodePen'
import { Pre } from './src/components/Pre'

const components = {
  Caption,
  CodePen,
  YouTube,
  img: Image,
  table: Table,
  a: A,
  pre: Pre,
  quote: Quote,
  ...headers,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
