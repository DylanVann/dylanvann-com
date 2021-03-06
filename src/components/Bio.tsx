/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { A } from './A'
// @ts-ignore
import ProfileImage from './ProfileImage.jpg'
import { rhythm } from '../typography'
import styled from '@emotion/styled'
import { GitHubLink } from './GitHubLink'

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

export const SignUpForm = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [subscribed, setSubscribed] = React.useState(false)
  return (
    <div sx={{ position: 'relative' }}>
      {subscribed && (
        <div
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <strong sx={{ mb: 20 }}>Subscribed!</strong>
          You should receive an email with a confirmation link!
        </div>
      )}
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
              // eslint-disable-next-line @typescript-eslint/camelcase
              api_key: '2jnVrugk1S7PzsMPVIhMVg',
              // eslint-disable-next-line @typescript-eslint/camelcase
              first_name: name,
              email,
              // eslint-disable-next-line @typescript-eslint/camelcase
              email_address: email,
            }),
          })
          setSubscribed(true)
        }}
        sx={{
          opacity: subscribed ? 0 : 1,
          visibility: subscribed ? 'hidden' : 'visible',
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
            type="text"
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
    </div>
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
        <p sx={{ marginBottom: 40 }}>
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
