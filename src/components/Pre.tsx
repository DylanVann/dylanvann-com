import React from 'react'

export const Pre = (p: any) => {
  return (
    <pre
      {...p}
      className={
        p.className === 'language-diff'
          ? 'language-diff diff-highlight'
          : p.className
      }
    />
  )
}
