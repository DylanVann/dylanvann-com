import React from 'react'
import get from 'lodash/get'
import { PostTitle, PostSubTitle, PostDate } from './PostTypography'
import { Link } from 'gatsby'
import Markdown from './Markdown'
import styled from 'react-emotion'

const PostHeader = styled('header')`
  display: block;
  margin-bottom: 20px;
  text-align: center;
`

const GitHubLink = styled('a')`
  padding: 6px 12px;
  display: inline-block;
  color: #428bca !important;
  border: 1px solid #428bca;
  transition-property: all;
  transition-duration: 0.2s;
  :hover {
    color: #1f496e !important;
    border-color: #1f496e;
  }
`

const Post = props => {
  const title = get(props, 'frontmatter.title')
  const subtitle = get(props, 'frontmatter.subtitle')
  const date = get(props, 'fields.date')
  const slug = get(props, 'fields.slug')
  const github = get(props, 'frontmatter.github')
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
        {github && <GitHubLink href={github}>Download on GitHub</GitHubLink>}
      </PostHeader>
      <Markdown ast={ast} />
    </div>
  )
}

export default styled(Post)`
  margin-bottom: 200px;
`
