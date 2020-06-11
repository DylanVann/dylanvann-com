import React from 'react'

export function Table(props: { children: React.ReactNode; style: any }) {
  // Fix for semi article tables.
  const overflowX = props.style ? undefined : 'auto'
  console.log(props)
  return (
    <div
      css={{
        overflowX,
        marginBottom: '1.53rem',
      }}
    >
      <table
        css={{
          width: 'auto',
          tableLayout: 'fixed',
          whiteSpace: 'nowrap',
          marginBottom: 0,
        }}
        {...props}
      />
    </div>
  )
}
