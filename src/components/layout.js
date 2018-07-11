import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import { rhythm } from '../typography'
import '../index.css'

class Template extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(26),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {children}
      </div>
    )
  }
}

Template.propTypes = {
  children: PropTypes.node,
  location: ReactRouterPropTypes.location.isRequired,
}

export default Template
