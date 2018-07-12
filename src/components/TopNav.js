import React from 'react'
import styled from 'react-emotion'
import {
  colorTextAccent,
  colorTextDark,
  resetButton,
  topNavHeight,
} from '../styles'
import Container from './Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index.es'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'gatsby'

const TopNavContainer = styled('div')`
  transform: translateZ(0);
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  font-weight: 300;
`

const SrOnly = styled('span')`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`

const NavUL = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  li {
    margin-bottom: 0;
  }
`

const StyledContainer = styled(Container)`
  padding-top: 0;
  padding-bottom: 0;
  line-height: ${topNavHeight}px;
  a {
    text-decoration: none;
    color: ${colorTextDark};
    transition: color 0.2s;
    padding: 0 10px;
  }
  a:hover {
    color: ${colorTextAccent};
  }
`

const Row = styled('div')`
  display: flex;
  margin: 0 -10px;
`

const Button = styled('button')`
  ${resetButton};
`

const TopNav = () => (
  <TopNavContainer>
    <StyledContainer>
      <Row>
        <Link to="/">Dylan Vann</Link>
        <div className="nav-links">
          <NavUL>
            <li>
              <Link to="/">Posts</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <a className="nav-link" href="https://github.com/dylanvann">
                <FontAwesomeIcon icon={faGithub} />
                <SrOnly>Github</SrOnly>
              </a>
            </li>
            <li>
              <a className="nav-link" href="https://twitter.com/atomarranger">
                <FontAwesomeIcon icon={faTwitter} />
                <SrOnly>Twitter</SrOnly>
              </a>
            </li>
          </NavUL>
        </div>
      </Row>
    </StyledContainer>
  </TopNavContainer>
)

export default TopNav