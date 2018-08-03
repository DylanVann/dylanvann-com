import React from 'react'
import Container from '../components/Container'
import Layout from '../components/Layout'
import ListEnd from '../components/ListEnd'
import Post from '../components/Post'
import Spinner from '../components/Spinner'
import { IS_SSR } from '../config'
import { fetchData } from '../utils/fetchData'
import PageControl from '../components/PageControl'

class BlogIndex extends React.Component {
  loading = false

  state = {
    index: this.props.pageContext.index,
    group: this.props.pageContext.group,
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    const distanceFromBottom =
      document.body.clientHeight - (window.pageYOffset + window.innerHeight)
    const hasReachedEnd = this.state.index === this.props.pageContext.pageCount
    if (distanceFromBottom < 200 && !this.loading && !hasReachedEnd) {
      this.onReachedEnd()
    }
  }

  // This resets the state if the articles from pageContext change.
  static getDerivedStateFromProps(props, state) {
    const propsSlug = props.pageContext.group[0].node.fields.slug
    const stateSlug = state.group[0].node.fields.slug
    const pageChanged = propsSlug !== stateSlug
    if (pageChanged) {
      const index = props.pageContext.index
      const group = props.pageContext.group
      return {
        index,
        group,
      }
    }
    return null
  }

  onReachedEnd = async () => {
    this.loading = true
    const pageCount = this.props.pageContext.pageCount
    const index = this.state.index
    const hasReachedEnd = index === pageCount
    if (hasReachedEnd) return
    const newData = await fetchData(`/${index + 1}`)
    const newGroup = newData.pageContext.group
    const newGroups = this.state.group.concat(newGroup)
    this.setState(
      {
        group: newGroups,
        index: index + 1,
      },
      () => {
        this.loading = false
      }
    )
  }

  render() {
    const { pageContext } = this.props
    const index = this.state.index
    const { pageCount } = pageContext
    const { group } = this.state
    return (
      <Layout>
        <Container>
          {group.map(({ node }) => <Post key={node.fields.slug} {...node} />)}
          {IS_SSR && <PageControl page={index} pageCount={pageCount} />}
          {!IS_SSR && index === pageCount && <ListEnd />}
          {!IS_SSR && index !== pageCount && <Spinner />}
        </Container>
      </Layout>
    )
  }
}

export default BlogIndex
