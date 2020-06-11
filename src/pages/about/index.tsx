import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import { faCodepen } from '@fortawesome/free-brands-svg-icons/faCodepen'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { Focus, SignUpForm } from '../../components/Bio'
import { Container } from '../../components/Container'
import { Layout } from '../../components/Layout'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { A } from '../../components/A'
import { PostTitle } from '../../components/PostTypography'
import Img from 'gatsby-image'

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

interface AboutProps {
  data: {
    file: {
      childImageSharp: {
        fluid: any
      }
    }
  }
}

const About: React.FC<AboutProps> = (props: AboutProps) => (
  <Layout {...props} title="About" description="About Dylan Vann.">
    <Img css={cssImg} fluid={props.data.file.childImageSharp.fluid} />
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
      <hr />
      <SignUpForm />
    </Container>
  </Layout>
)

export default About

export const pageQuery = graphql`
  query AboutPage {
    ...SiteMeta
    file(relativePath: { eq: "about/profile_full_width.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1024) {
          base64
          tracedSVG
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
          originalImg
          originalName
        }
      }
    }
  }
`
