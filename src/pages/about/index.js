import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index.es'
import {
  faCodepen,
  faTwitter,
  faGithub,
  faYoutube,
  faStackOverflow,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styled from 'react-emotion'
import { css } from 'emotion'
import Footer from '../../components/Footer'
import { A } from '../../components/Markdown'
import TopNav from '../../components/TopNav'
import ProfileImage from './profile_full_width.jpg'

const FontAwesomeUL = styled('ul')`
  margin-left: 0;
  list-style-type: none;
`

const w = 2560
const h = 560

const imageStyle = css`
  margin: 0;
  width: 100%;
  height: 0;
  padding-bottom: ${(h / w) * 100}%;
  background-origin: border-box;
  background-size: cover;
  background: #eee url(${ProfileImage}) center;
`

const StyledA = styled(A)`
  svg {
    width: 1.5rem;
    // *magic*
    height: 0.78rem;
  }
`

const About = props => (
  <>
    <TopNav />
    <img src={ProfileImage} className={imageStyle} />
    <Layout location={props.location}>
      <h1>{"Hi, I'm Dylan Vann."}</h1>
      <ul>
        <li>I design and develop software.</li>
        <li>I have a degree in mechatronics engineering.</li>
        <li>I run on EDM, science fiction, sushi, and coffee.</li>
      </ul>
      <p>
        <b>You can find me on these sites:</b>
      </p>
      <FontAwesomeUL>
        <li>
          <StyledA href="https://github.com/dylanvann">
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </StyledA>
        </li>
        <li>
          <StyledA href="https://twitter.com/Atomarranger">
            <FontAwesomeIcon icon={faTwitter} /> Twitter
          </StyledA>
        </li>
        <li>
          <StyledA href="https://codepen.io/dylanvann">
            <FontAwesomeIcon icon={faCodepen} /> CodePen
          </StyledA>
        </li>
        <li>
          <StyledA href="https://www.youtube.com/channel/UCHpbzclAIcvKcfHdtVTnyhA">
            <FontAwesomeIcon icon={faYoutube} /> YouTube
          </StyledA>
        </li>
        <li>
          <StyledA href="https://stackoverflow.com/users/2669591/dylanvann">
            <FontAwesomeIcon icon={faStackOverflow} /> Stack Overflow
          </StyledA>
        </li>
        <li>
          <StyledA href="https://www.instagram.com/Atom_arranger">
            <FontAwesomeIcon icon={faInstagram} /> Instagram
          </StyledA>
        </li>
      </FontAwesomeUL>
      <p>
        <b>Or contact me at:</b>
      </p>
      <FontAwesomeUL>
        <li>
          <StyledA href="mailto:dylan@dylanvann.com">
            <FontAwesomeIcon icon={faEnvelope} /> dylan@dylanvann.com
          </StyledA>
        </li>
      </FontAwesomeUL>
    </Layout>
    <Footer />
  </>
)

export default About
