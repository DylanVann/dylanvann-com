import React from 'react'

export function Table(props: { children: React.ReactNode }) {
  return (
    <div css={{ overflowX: 'auto', marginBottom: '1.53rem' }}>
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
