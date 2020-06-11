import React from 'react'
import get from 'lodash/get'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { PostTitle, PostSubTitle, PostDate } from './PostTypography'
import { Markdown } from './Markdown'
import { GitHubLink } from './GitHubLink'

const PostHeader = styled('header')`
  display: block;
  margin-bottom: 40px;
  text-align: center;
`

interface PostProps {
  body: any
  className?: string
  list?: boolean
}

export const Post = (props: PostProps) => {
  const title = get(props, 'frontmatter.title')
  const subtitle = get(props, 'frontmatter.subtitle')
  const date = get(props, 'fields.date')
  const datetime = get(props, 'fields.datetime')
  const slug = get(props, 'fields.slug')
  const github = get(props, 'frontmatter.github')
  return (
    <div className={props.className} style={{ marginBottom: 80 }}>
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
      <Markdown>{props.body}</Markdown>
    </div>
  )
}
