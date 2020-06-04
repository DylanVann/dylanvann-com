import React from 'react'
import styled from '@emotion/styled'

interface SpinnerProps {
  className?: string
}

function SpinnerBase({ className }: SpinnerProps) {
  return (
    <div className={className}>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  )
}

export const Spinner = styled(SpinnerBase)`
  margin: 100px auto 0;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;

  div {
    width: 18px;
    height: 18px;
    margin: 10px;
    background-color: #333;

    border-radius: 100%;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`
