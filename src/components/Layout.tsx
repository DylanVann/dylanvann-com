import React from 'react'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import Footer from './Footer'
import TopNav from './TopNav'
import Meta from './Meta'
import '../styles'
import { globalStyle } from '../styles'

if (typeof window !== 'undefined') {
  require('intersection-observer')
}

const Container = styled('div')`
  flex: 1;
`

interface LayoutProps {
  title?: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => (
  <>
    <Meta title={props.title} />
    <Global styles={globalStyle} />
    <TopNav />
    <Container>{props.children}</Container>
    <Footer />
  </>
)

export default Layout
