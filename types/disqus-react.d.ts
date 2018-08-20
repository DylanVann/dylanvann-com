import React from 'react'

export class CommentCount {
  constructor(...args: any[])
  cleanInstance(): void
  componentDidMount(): void
  componentDidUpdate(): void
  componentWillUpdate(nextProps: any): void
  forceUpdate(callback: any): void
  loadInstance(): void
  render(): any
  setState(partialState: any, callback: any): void
  shouldComponentUpdate(nextProps: any): any
}
export class CommentEmbed {
  static defaultProps: {
    height: number
    showMedia: boolean
    showParentComment: boolean
    width: number
  }
  constructor(...args: any[])
  forceUpdate(callback: any): void
  getSrc(): any
  render(): any
  setState(partialState: any, callback: any): void
}
export class DiscussionEmbed extends React.Component<any> {
  constructor(...args: any[])
  cleanInstance(): void
  componentDidMount(): void
  componentDidUpdate(): void
  componentWillMount(): void
  componentWillUpdate(nextProps: any): void
  forceUpdate(callback: any): void
  getDisqusConfig(config: any): any
  loadInstance(): void
  render(): any
  setState(partialState: any, callback: any): void
  shouldComponentUpdate(nextProps: any): any
}
export default _default
export namespace _default {
  class CommentCount {
    constructor(...args: any[])
    cleanInstance(): void
    componentDidMount(): void
    componentDidUpdate(): void
    componentWillUpdate(nextProps: any): void
    forceUpdate(callback: any): void
    loadInstance(): void
    render(): any
    setState(partialState: any, callback: any): void
    shouldComponentUpdate(nextProps: any): any
  }
  class CommentEmbed {
    static defaultProps: {
      height: number
      showMedia: boolean
      showParentComment: boolean
      width: number
    }
    constructor(...args: any[])
    forceUpdate(callback: any): void
    getSrc(): any
    render(): any
    setState(partialState: any, callback: any): void
  }
  class DiscussionEmbed {
    constructor(...args: any[])
    cleanInstance(): void
    componentDidMount(): void
    componentDidUpdate(): void
    componentWillMount(): void
    componentWillUpdate(nextProps: any): void
    forceUpdate(callback: any): void
    getDisqusConfig(config: any): any
    loadInstance(): void
    render(): any
    setState(partialState: any, callback: any): void
    shouldComponentUpdate(nextProps: any): any
  }
}
