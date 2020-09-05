/** @jsx jsx */
import { jsx } from 'theme-ui'
import { YouTube } from './components/YouTube'
import { Caption } from './components/Caption'
import { CodePen } from './components/CodePen'
import { Image } from './components/Image'
import { headers } from './components/headers'
import { A } from './components/A'
import { Quote } from './components/Quote'
import { Table } from './components/Table'
import { Pre } from './components/Pre'
import { Code } from './components/Code'
import { Playground } from './components/Playground/Playground'

const PlaygroundWithMargin = (props: any) => (
  <Playground {...props} css={{ marginBottom: '1.53em' }} />
)

export const mdxComponents = {
  Caption,
  CodePen,
  YouTube,
  img: Image,
  table: Table,
  code: Code,
  Playground: PlaygroundWithMargin,
  a: A,
  pre: Pre,
  quote: Quote,
  ...headers,
}
