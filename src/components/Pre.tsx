import React from 'react'

export const Pre = (props: { className?: string }) => {
  const className =
    props.className && props.className.includes('language-diff')
      ? `${props.className} diff-highlight`
      : props.className
  return <pre {...props} className={className} />
}
