import React from 'react'
import { A } from './Markdown'
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
            <strong>Dylan Vann</strong> | Software developer living and working
            in Toronto 🇨🇦. Focused on <strong>Node</strong> |{' '}
            <strong>GraphQL</strong> | <strong>React</strong> |{' '}
            <strong>React Native</strong>.
          </p>
          <p>
            <A href="https://twitter.com/atomarranger">
              Follow me on Twitter for more stuff like this.
            </A>
          </p>
        </div>
      </Container>
    )
  }
}

export default Bio
