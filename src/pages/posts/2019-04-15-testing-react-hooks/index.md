---
title: How does React Hooks affect testing?
---

How does React Hooks change traditional approaches to React app architecture and testing?

**Not very much:**

- You should still write most of your components as stateless functional components (not using hooks).
- You should still use a state management library for 90% of your application state.

**Hooks should be reserved for special cases:**

- Animations.
- Integrating non-react libraries.
- Creating more complex reusable components (should be done sparingly).

> Anytime you'd currently use a class component, you could instead use hooks.
> Also, if you haven't already been avoiding class components you should avoid them.

Historically avoiding class components has been a good practice in React, and I think avoiding using Hooks for most components will continue to be a good approach.

**Benefits of hooks over class components:**

- You can more easily share complex / stateful logic.
- You can more easily avoid bugs that are easy to accidentally write in class components (https://overreacted.io/writing-resilient-components/)

> Most business logic should still live in your state management library, and it can be tested in isolation there instead of being
> tested in React components.

Reusable/stateful/complex components that require hooks should be tested using more integration like tests.
The best library available for doing this right now is [react-testing-library](https://github.com/kentcdodds/react-testing-library).
The philosophy of `react-testing-library` is that your tests should resemble how your code is used, and it should test what your users care about.
This works very well for testing hooks, because using this approach wether or not a component uses them is an implementation detail that should not affect how a test is written.

At some point there are going to be more state management libraries providing hooks APIs.
For these I believe it would still be best to call them in container components, which could now be written as function components.
These containers should be relatively simple, and could probably be untested, similar to most Redux containers.

In summary, if you want an app to be as maintainable as possible I think you should treat most hooks the way you treat class components now, avoiding using them in favor of relying on a state management library 90% of the time.
