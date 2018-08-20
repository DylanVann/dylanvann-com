import React, { SFC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
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
import { Focus } from '../../components/Bio'
import Container from '../../components/Container'
import Layout from '../../components/Layout'
import styled from 'react-emotion'
import { css } from 'emotion'
import { A } from '../../components/Markdown'
import { PostTitle } from '../../components/PostTypography'
import { FastImage } from 'react-fast-image'

const FontAwesomeUL = styled('ul')`
  margin-left: 0;
  list-style-type: none;
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

const cssImg = css`
  width: 100% !important;
`

interface ImageProps {
  imgSrc: string;
  imgSrcSet: string;
  imgWebPSrc: string;
  imgWebPSrcSet: string;
  imgBase64: string;
  height: number;
  width: number;
}

interface AboutProps {
  data: {
    file: {
      childImageCloudinary: {
        fluid: ImageProps;
      }
    }
  }
}

const About: SFC<AboutProps> = props => (
  <Layout {...props} title="About">
    <FastImage
      className={cssImg}
      {...props.data.file.childImageCloudinary.fluid}
    />
    <Container>
      <StyledTitle>{"Hi, I'm Dylan Vann"}</StyledTitle>
      <ul>
        <li>I design and develop software.</li>
        <li>I have a degree in mechatronics engineering.</li>
        <li>I run on EDM, science fiction, sushi, and coffee.</li>
        <li>
          <Focus />
        </li>
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
    </Container>
  </Layout>
)

export default About

export const pageQuery = graphql`
  query AboutPage {
    ...SiteMeta
    file(relativePath: { eq: "about/profile_full_width.jpg" }) {
      childImageCloudinary {
        fluid(maxWidth: 1024) {
          imgSrc
          imgSrcSet
          imgWebPSrc
          imgWebPSrcSet
          imgBase64
          height
          width
        }
      }
    }
  }
`
