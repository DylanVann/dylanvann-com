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
import {
  lineHeight,
  previewHeight,
  tabsHeight,
  tabsMarginTop,
  previewBorder,
} from './components/Playground/constants'
import { getInitialState } from './components/Playground/getInitialState'
import type { PlaygroundProps } from './components/Playground/Playground'

const PlaceHolder = ({ style, className, initialState }: PlaygroundProps) => {
  const lines = initialState.files[initialState.selected].code
    .trim()
    .split('\n').length
  const codeHeight = lines * lineHeight + 40
  return (
    <div
      style={style}
      className={className}
      css={{ display: 'flex', flexDirection: 'column' }}
    >
      <div
        css={{
          boxSizing: 'border-box',
          height: previewHeight,
          border: previewBorder,
          background: 'white',
        }}
      />
      <div
        css={{
          marginTop: tabsMarginTop,
          height: tabsHeight + codeHeight,
          background: '#f5f7ff',
        }}
      />
    </div>
  )
}

const PlaygroundWithMargin = (props: any) => {
  const initialState = getInitialState(props.children)
  const [Playground, setPlayground] = useState<any>(() => PlaceHolder)
  useEffect(() => {
    import('./components/Playground/Playground').then(({ Playground }) =>
      setPlayground(() => Playground),
    )
  }, [])
  return (
    <Playground
      {...props}
      initialState={initialState}
      css={{ marginBottom: '1.53em' }}
    />
  )
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
