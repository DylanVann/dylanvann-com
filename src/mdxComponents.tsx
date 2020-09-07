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
import { useState, useEffect } from 'react'

const PlaceHolder = ({ children }: any) => {
  let lines = 0
  children.forEach((child: any) => {
    const code: string = child.props.children.props.children.trim()
    lines = Math.max(lines, code.split('\n').length)
  })
  const codeHeight = lines * 21.42 + 40
  return (
    <div
      css={{
        width: '100%',
        background: '#f5f7ff',
        marginBottom: '1.53em',
        height: 32 + 4 + 200 + codeHeight,
      }}
    />
  )
}

const PlaygroundWithMargin = (props: any) => {
  const [Playground, setPlayground] = useState<any>(() => PlaceHolder)
  useEffect(() => {
    import('./components/Playground/Playground').then(({ Playground }) =>
      setPlayground(() => Playground),
    )
  }, [])
  return <Playground {...props} css={{ marginBottom: '1.53em' }} />
}

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
