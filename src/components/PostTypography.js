import styled from 'react-emotion'
import { colorTextMuted, colorTextTitle, fontRaleway } from '../styles'

export const PostTitle = styled('h1')`
  //font-size: 2.5rem;
  font-family: ${fontRaleway};
  font-weight: 900;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${colorTextTitle};
  transition: color 0.2s;
  &:hover {
    color: black;
  }
  a {
    color: inherit;
    text-decoration: none;
    box-shadow: none;
  }
`

export const PostSubTitle = styled('h2')`
  //font-size: 2rem;
  font-family: ${fontRaleway};
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${colorTextTitle};
`

export const PostDate = styled('time')`
  font-family: ${fontRaleway};
  display: block;
  font-weight: 400;
  color: ${colorTextMuted};
  font-size: 16px;
  margin-bottom: 10px;
`
