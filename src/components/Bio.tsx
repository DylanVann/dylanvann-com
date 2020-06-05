/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { A } from './Markdown'
// @ts-ignore
import ProfileImage from './ProfileImage.jpg'
import { rhythm } from '../typography'
import styled from '@emotion/styled'
import { GitHubLink } from './GitHubLink'
import { Stack } from './Stack'

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

const Button = GitHubLink.withComponent('button')

export const Focus = () => (
  <React.Fragment>
    Focused on <strong>Node</strong> | <strong>GraphQL</strong> |{' '}
    <strong>React</strong> | <strong>React Native</strong>.
  </React.Fragment>
)

const SignUpForm = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formId = 1438911
        fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: '2jnVrugk1S7PzsMPVIhMVg',
            first_name: name,
            email,
          }),
        })
      }}
      sx={{
        display: 'grid',
        gap: 1,
        marginLeft: '5%',
        marginRight: '5%',
        flex: 1,
      }}
    >
      <strong sx={{ marginBottom: 1 }}>Join the Newsletter</strong>
      <div>
        <label htmlFor="firstName" sx={{ marginRight: 10 }}>
          First Name
        </label>
        <br />
        <input
          name="firstName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: '100%' }}
        />
      </div>
      <div sx={{ marginBottom: 10 }}>
        <label htmlFor="email" sx={{ marginRight: 10 }}>
          Email
        </label>
        <br />
        <input
          required
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: '100%' }}
        />
      </div>
      <Button
        type="submit"
        sx={{
          backgroundColor: '#428bca',
          color: 'white !important',
          border: 'none',
          ':hover': {
            color: 'white !important',
            backgroundColor: '#1f496e',
            border: 'none',
          },
        }}
      >
        Subscribe
      </Button>
      <A href="https://twitter.com/atomarranger">
        Or follow me on Twitter for more stuff like this.
      </A>
    </form>
  )
}

export const Bio = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
      }}
    >
      <div sx={{ display: 'flex' }}>
        <ProfilePicture src={ProfileImage} alt={`Dylan Vann`} />
        <p sx={{ marginBottom: 100 }}>
          <strong>Dylan Vann</strong>
          <br />
          Software developer living in Toronto 🇨🇦 (and sometimes NYC 🗽).
          <br />
          <Focus />
        </p>
      </div>
      <SignUpForm />
    </Container>
  )
}
