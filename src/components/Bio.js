import React from 'react'
import profilePic from './profile-pic.jpg'
import { rhythm } from '../typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Dylan Vann`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Written by <strong>Dylan Vann</strong> who lives and works in Toronto
          building useless things.{' '}
          <a href="https://twitter.com/atomarranger">
            You should follow him on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
