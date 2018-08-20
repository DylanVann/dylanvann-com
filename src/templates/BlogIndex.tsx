import React from 'react'
import Container from '../components/Container'
import Layout from '../components/Layout'
import ListEnd from '../components/ListEnd'
import Post from '../components/Post'
import Spinner from '../components/Spinner'
import { IS_SSR } from '../config'
import { fetchData } from '../utils/fetchData'
import PageControl from '../components/PageControl'

interface BlogIndexProps {
  pageContext: {
    index: number
    group: Array<{ node: any }>
    pageCount: number
  }
}

function BlogIndex(props: BlogIndexProps) {
  const [state, setState] = React.useState({
    loading: false,
    index: props.pageContext.index,
    group: props.pageContext.group,
  })

  const onReachedEnd = React.useCallback(async () => {
    setState(state => ({ ...state, loading: true }))
    const pageCount = props.pageContext.pageCount
    const index = state.index
    const hasReachedEnd = index === pageCount
    if (hasReachedEnd) return
    const newData = await fetchData(`/${index + 1}`)
    const newGroup = newData.pageContext.group
    const newGroups = state.group.concat(newGroup)
    setState(state => ({
      group: newGroups,
      index: state.index + 1,
      loading: false,
    }))
  }, [props.pageContext.pageCount, state.group, state.index])

  const onScroll = React.useCallback(() => {
    const distanceFromBottom =
      document.body.clientHeight - (window.pageYOffset + window.innerHeight)
    const hasReachedEnd = state.index === props.pageContext.pageCount
    if (distanceFromBottom < 200 && !state.loading && !hasReachedEnd) {
      onReachedEnd()
    }
  }, [onReachedEnd, props.pageContext.pageCount, state.index, state.loading])

  React.useEffect(() => {
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const { index, group } = state
  const { pageCount } = props.pageContext
  return (
    <Layout>
      <Container>
        {group.map(({ node }) => (
          <Post key={node.fields.slug} list {...node} />
        ))}
        {IS_SSR && <PageControl page={index} pageCount={pageCount} />}
        {!IS_SSR && index === pageCount && <ListEnd />}
        {!IS_SSR && index !== pageCount && <Spinner />}
      </Container>
    </Layout>
  )
}

export default BlogIndex
