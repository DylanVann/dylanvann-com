/** @jsx jsx */
import { jsx } from 'theme-ui'
import Highlight from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'
import { Prism } from './Prism'

export interface CodeProps {
  children: string
  className: string
  metastring: string
  live: boolean
}

const getClassName = (v: string) =>
  v.includes('language-diff') ? `${v} diff-highlight` : v

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
        <pre
          className={getClassName(className)}
          style={{ ...style, padding: 20, margin: 0 }}
        >
          <code css={{ fontSize: '1em', lineHeight: '1.375' }}>
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                css={{ display: 'flex' }}
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
