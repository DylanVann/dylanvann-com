/** @jsx jsx */
import { jsx } from 'theme-ui'

export function Table(props: { children: React.ReactNode; style: any }) {
  // Fix for semi article tables.
  const overflowX = props.style ? undefined : 'auto'
  return (
    <div
      css={{
        overflowX,
        marginBottom: '1.53rem',
        // '& td > :first-child': {
        //   marginTop: 0,
        // },
        '& td > :last-child': {
          marginBottom: 0,
        },
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
