import React from 'react'
import Highlight from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'
import { PlaygroundFileIdk } from './Playground/Playground'

const Prism = require('prismjs')
;(typeof global !== 'undefined' ? global : (window as any)).Prism = Prism
require('prism-svelte')
require('prismjs/components/prism-jsx.min')

export interface CodeProps {
  children: string
  className: string
  metastring: string
  live: boolean
}

export const Code = (props: CodeProps) => {
  const { children, className } = props
  const code = children.trim()
  const attributes = (props.metastring || '').split(' ')
  const isPlaygroundFile = attributes.includes('playground')
  const firstClassName = className.split(' ')[0]
  const language: Language = firstClassName.replace(/language-/, '') as Language
  if (isPlaygroundFile) {
    const filename = attributes
      .find((v) => v.startsWith('filename='))
      ?.replace('filename=', '')
    if (!filename) {
      throw new Error('Needs a filename.')
    }
    console.log('rendering idk', filename)
    return <PlaygroundFileIdk code={code} filename={filename} />
  }
  return (
    <Highlight
      Prism={Prism}
      theme={{ plain: {}, styles: [] }}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
