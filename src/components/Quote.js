import React from 'react'
import { css } from 'emotion'

const style = css`
  border-left: 6px solid #ccc;
  background: #f9f9f9;
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: 1em 10px;
  quotes: '“' '”' '‘' '’';

  :before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.2em;
    vertical-align: -0.4em;
  }

  :after {
    visibility: hidden;
    content: close-quote;
    display: block;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
    vertical-align: -0.4em;
  }

  p {
    display: inline;
  }

  cite {
    color: #999999;
    display: block;
    margin-top: 5px;
  }

  cite:before {
    content: '—' ' ';
  }
`

const Quote = ({ quote, cite, className }) => (
  <blockquote className={style}>
    {quote}
    <cite>{cite}</cite>
  </blockquote>
)

export default Quote
