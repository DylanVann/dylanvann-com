import React from 'react'
import PropTypes from 'prop-types'
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
    // eslint-disable-next-line
    index: this.props.pageContext.index,
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
    const {
      pageContext: { pageCount },
    } = this.props
    const { group, index } = this.state
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
}

BlogIndex.propTypes = {
  pageContent: PropTypes.shape({
    index: PropTypes.number,
    group: PropTypes.object,
  }),
}

export default BlogIndex
