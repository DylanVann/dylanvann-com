import { YouTube } from './components/YouTube'
import { Caption } from './components/Caption'
import { CodePen } from './components/CodePen'
import { Image } from './components/Image'
import { headers } from './components/headers'
import { A } from './components/A'
import { Quote } from './components/Quote'
import { Table } from './components/Table'
import { Pre } from './components/Pre'

export const mdxComponents = {
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
