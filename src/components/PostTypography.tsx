import styled from '@emotion/styled'
import { colorTextMuted, colorTextTitle, fontRaleway } from '../styles'

export const PostTitle = styled<'h1', { list?: boolean }>('h1', {
  shouldForwardProp: (p) => p !== 'list',
})`
  font-family: ${fontRaleway};
  font-size: ${(p: { list?: boolean }) => (p.list ? '1.5rem' : '2rem')};
  font-weight: 900;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${colorTextTitle};
  transition: color 0.2s;
  text-align: center;
  &:hover {
    color: black;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
    box-shadow: none;
  }
`

interface PostSubTitleProps {
  list?: boolean
}

export const PostSubTitle = styled<'h2', PostSubTitleProps>('h2', {
  shouldForwardProp: (p) => p !== 'list',
})`
  font-size: ${(p) => (p.list ? '1.25rem' : '1.5rem')};
  font-family: ${fontRaleway};
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${colorTextTitle};
  text-align: center;
`

export const PostDate = styled('time')`
  font-family: ${fontRaleway};
  display: block;
  font-weight: 400;
  color: ${colorTextMuted};
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
`
