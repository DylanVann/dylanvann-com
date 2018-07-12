import React from 'react'
import ProfileImage from './ProfileImage.jpg'
import { rhythm } from '../typography'
import styled from 'react-emotion'

const Container = styled('div')`
  display: flex;
  margin-bottom: ${rhythm(2.5)};
`

const ProfilePicture = styled('img')`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  width: ${rhythm(2)};
  height: ${rhythm(2)};
  border-radius: 50%;
`

class Bio extends React.Component {
  render() {
    return (
      <Container>
        <ProfilePicture src={ProfileImage} alt={`Dylan Vann`} />
        <div>
          <p>
            I'm <strong>Dylan Vann</strong>. I'm a software developer living and
            working in Toronto 🇨🇦. Right now I'm mostly focused on{' '}
            <strong>Node</strong> | <strong>GraphQL</strong> |{' '}
            <strong>React</strong> | <strong>React Native</strong>.
          </p>
          <p>
            <a href="https://twitter.com/atomarranger">
              Follow me on Twitter for more stuff like this.
            </a>
          </p>
        </div>
      </Container>
    )
  }
}

export default Bio
