---
title: React + SSR + NoScript + CSS in JS Fallbacks
subtitle: Custom CSS for users with JS disabled.
---

_What does that title even mean?_

Assuming you have a site:

- Using CSS in JS.
- Using SSR (we're specifically using `emotion`, which is very similar to `styled-components`).
- That you'd like to work for users with JS disabled.

Then it means this is the article you need to read.

The specific site I was solving this issue for was created with Gatsby,
which has all of the above setup by default.

## The Scenario

You have some images which you would like to initially be hidden.
They will then fade in when the user scrolls to them.

This can be implemented like this:

```jsx
import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import styled from '@emotion/styled'
import { css } from 'emotion'

const hiddenStyles = css`
  opacity: 0;
  transform: translate(0px, 60px) scale(1.05, 1.05);
`

const visibleStyles = css`
  opacity: 1;
  transform: translateX(0px) translateY(0px) translateZ(0px) scaleX(1) scaleY(1)
    scaleZ(1);
`

const Container = styled('div')`
  transition: width 0.7s ease 0s, opacity 1200ms, transform 1800ms;
  ${hiddenStyles};
  ${({ visible }) => visible && visibleStyles};
`

class EnterAnimation extends React.Component {
  state = {
    visible: false,
  }

  onChange = visible => {
    if (visible && !this.state.visible) {
      this.setState({ visible: true })
    }
  }

  render() {
    return (
      <VisibilitySensor partialVisibility onChange={this.onChange}>
        <Container visible={this.state.visible}>
          {this.props.children}
        </Container>
      </VisibilitySensor>
    )
  }
}

export default EnterAnimation
```

The `EnterAnimation` class wraps children and shows them with a css animation when it is scrolled into view (using `react-visibility-sensor` to detect this).

The problem with this code is that when Gatsby extracts our CSS it will extract our hidden styles as the default.
This means users with JS disabled will not be able to see any elements wrapped in this component.

To get around this problem we can create specific styles for users with JS disabled.

## 1. Add a `no-js` class on `<html>`.

We're using `react-helmet` to add attributes to our html.
We can use the `Helmet` component to add a default `no-js` class to `html`.
It's important that this is only added during SSR or else it
will break styles for users with JS enabled.
Checking the `typeof window` allows us to determine if we're doing SSR or not.

```jsx
const IS_SSR = typeof window === 'undefined'

<Helmet>
    <html lang="en" className={IS_SSR ? 'no-js' : 'js'} />
</Helmet>
)
```

## 2. Remove `no-js` with a `<script>` in `<head>`.

We add a script in `<head>` to remove the `no-js` class (thanks to [Paul Irish](https://www.paulirish.com/2009/avoiding-the-fouc-v3/) for this one-liner).
Since it's a script it will only be removed for users who don't have JS disabled, and it won't run during SSR.

```jsx
<Helmet
  title={`${title} | ${siteTitle}`}
  meta={[{ name: 'description', content: siteDescription }]}
  script={[
    {
      type: 'text/javascript',
      innerHTML:
        "document.documentElement.className = document.documentElement.className.replace(/\\bno-js\\b/,'js');",
    },
  ]}
>
  <html className="no-js" />
</Helmet>
```

## 3. Add a `no-js` specific style.

To add a `no-js` specific style we'll use `emotion`.

```jsx
const Container = styled('div')`
  transition: width 0.7s ease 0s, opacity 1200ms, transform 1800ms;
  ${hiddenStyles};
  html.no-js & {
    ${visibleStyles};
  }
  ${({ visible }) => visible && visibleStyles};
`
```

We target the `<html>` element when it has the `no-js` class, then use `&` to target our specific component.
This style will be included in SSR, but will only be enabled when the `no-js` class is present.
For our JS users the class will be removed before the first render.

That's about all there is to it.
Users without JS don't make up a large part of most audiences, but when the tooling makes it easy to support them why not make an attempt?
