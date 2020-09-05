import React from 'react'
import Highlight from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'
import { Prism } from './Prism'

export interface CodeProps {
  children: string
  className: string
  metastring: string
  live: boolean
}

export const Code = (props: CodeProps) => {
  const { children, className } = props
  const code = children.trim()
  const firstClassName = className.split(' ')[0]
  const language: Language = firstClassName.replace(/language-/, '') as Language
  return (
    <Highlight
      Prism={Prism as any}
      theme={{ plain: {}, styles: [] }}
      code={code}
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
