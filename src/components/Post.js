import React from 'react'
import get from 'lodash/get'
import { PostTitle, PostSubTitle, PostDate } from './PostTypography'
import { Link } from 'gatsby'
import Markdown from './Markdown'
import styled from 'react-emotion'

const PostHeader = styled('header')`
  display: block;
  margin-bottom: 20px;
`

const Post = props => {
  const title = get(props, 'frontmatter.title')
  const subtitle = get(props, 'frontmatter.subtitle')
  const date = get(props, 'fields.date')
  const slug = get(props, 'fields.slug')
  const ast = props.htmlAst
  return (
    <div className={props.className}>
      <PostHeader>
        {title && (
          <PostTitle>
            <Link to={slug}>{title}</Link>
          </PostTitle>
        )}
        {subtitle && <PostSubTitle>{subtitle}</PostSubTitle>}
        <PostDate dateTime={date}>{date}</PostDate>
      </PostHeader>
      <Markdown ast={ast} />
    </div>
  )
}

export default styled(Post)`
  margin-bottom: 200px;
`
