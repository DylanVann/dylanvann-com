import React from 'react'
import get from 'lodash/get'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { PostTitle, PostSubTitle, PostDate } from './PostTypography'
import { Markdown } from './Markdown'
import { GitHubLink } from './GitHubLink'
import { Helmet } from 'react-helmet-async'

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
  const description = get(props, 'frontmatter.description')
  const date = get(props, 'fields.date')
  const datetime = get(props, 'fields.datetime')
  const slug = get(props, 'fields.slug')
  const github = get(props, 'frontmatter.github')
  const baseUrl =
    process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_URL
  const url = `${baseUrl}/${slug}`
  const ogImageUrl = `${url}og-image.png`
  return (
    <div className={props.className} style={{ marginBottom: 80 }}>
      <Helmet>
        {/* Generic */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        {/* Image */}
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content={description} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Twitter */}
        <meta name="twitter:site" content="@atomarranger" />
        <meta name="twitter:creator" content="@atomarranger" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>
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
