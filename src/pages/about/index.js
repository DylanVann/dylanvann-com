import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index.es'
import {
  faCodepen,
  faTwitter,
  faGithub,
  faYoutube,
  faStackOverflow,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styled from 'react-emotion'
import { css } from 'emotion'
import Footer from '../../components/Footer'
import { A } from '../../components/Markdown'
import { PostTitle } from '../../components/PostTypography'
import TopNav from '../../components/TopNav'
import ProfileImage from './profile_full_width.jpg'

const FontAwesomeUL = styled('ul')`
  margin-left: 0;
  list-style-type: none;
`

const w = 2560
const h = 560

const imageContainerStyle = css`
  position: relative;
  margin: 0;
  width: 100%;
  height: 0;
  padding-bottom: ${(h / w) * 100}%;
  background-origin: border-box;
  background-size: cover;
  background-color: #eee;
`

const imageStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const StyledA = styled(A)`
  svg {
    width: 1.5rem;
    // *magic*
    height: 0.78rem;
  }
`

const StyledTitle = styled(PostTitle)`
  margin-bottom: 40px;
`

const About = props => (
  <>
    <TopNav />
    <div className={imageContainerStyle}>
      <img src={ProfileImage} className={imageStyle} />
    </div>
    <Layout location={props.location}>
      <StyledTitle>{"Hi, I'm Dylan Vann"}</StyledTitle>
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
        <li>
          <StyledA href="https://www.linkedin.com/in/dylanvann">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
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
