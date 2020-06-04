import React from 'react'
import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { ListEnd } from '../components/ListEnd'
import { Post } from '../components/Post'
import { Spinner } from '../components/Spinner'
import { IS_SSR } from '../config'
import { fetchData } from '../utils/fetchData'
import { PageControl } from '../components/PageControl'

interface BlogIndexProps {
  pageContext: {
    index: number
    group: Array<{ node: any }>
    pageCount: number
  }
}

export default function BlogIndex(props: BlogIndexProps) {
  const [state, setState] = React.useState({
    loading: false,
    index: props.pageContext.index,
    group: props.pageContext.group,
  })

  React.useEffect(() => {
    if (!state.loading) return
    const run = async () => {
      const pageCount = props.pageContext.pageCount
      const index = state.index
      const hasReachedEnd = index === pageCount
      if (hasReachedEnd) return
      const newIndex = index + 1
      const newData = await fetchData(`/${newIndex}`)
      const newGroup = newData.pageContext.group
      const newGroups = state.group.concat(newGroup)
      setState(() => ({
        group: newGroups,
        index: newIndex,
        loading: false,
      }))
    }
    run()
  }, [props.pageContext.pageCount, state.group, state.index, state.loading])

  const onScroll = React.useCallback(() => {
    const distanceFromBottom =
      document.body.clientHeight - (window.pageYOffset + window.innerHeight)
    const hasReachedEnd = state.index === props.pageContext.pageCount
    if (distanceFromBottom < 200 && !state.loading && !hasReachedEnd) {
      setState((state) => ({ ...state, loading: true }))
    }
  }, [props.pageContext.pageCount, state.index, state.loading])

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
