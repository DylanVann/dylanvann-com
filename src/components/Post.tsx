import React from 'react'
import get from 'lodash/get'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { PostTitle, PostSubTitle, PostDate } from './PostTypography'
import { Markdown } from './Markdown'

const PostHeader = styled('header')`
  display: block;
  margin-bottom: 40px;
  text-align: center;
`

const GitHubLink = styled('a')`
  padding: 6px 12px;
  display: inline-block;
  color: #428bca !important;
  border: 1px solid #428bca;
  transition-property: all;
  transition-duration: 0.2s;
  text-decoration: none;
  :hover {
    color: #1f496e !important;
    border-color: #1f496e;
  }
`

interface PostProps {
  className?: string
  list?: boolean
}

const PostBase = (props: PostProps) => {
  const title = get(props, 'frontmatter.title')
  const subtitle = get(props, 'frontmatter.subtitle')
  const date = get(props, 'fields.date')
  const datetime = get(props, 'fields.datetime')
  const slug = get(props, 'fields.slug')
  const github = get(props, 'frontmatter.github')
  const ast = get(props, 'htmlAst')
  return (
    <div className={props.className}>
      <PostHeader>
        {title && (
          <PostTitle list={props.list}>
            <Link to={`/${slug}`}>{title}</Link>
          </PostTitle>
        )}
        {subtitle && <PostSubTitle list={props.list}>{subtitle}</PostSubTitle>}
        <PostDate dateTime={datetime}>{date}</PostDate>
        {github && <GitHubLink href={github}>GitHub</GitHubLink>}
      </PostHeader>
      <Markdown ast={ast} />
    </div>
  )
}

export const Post = styled(PostBase)`
  margin-bottom: 200px;
`
