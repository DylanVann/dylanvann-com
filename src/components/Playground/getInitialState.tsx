import type { PlaygroundState } from './Playground'

export const getInitialState = (children: any): PlaygroundState => {
  let main: string | undefined
  let selected: string | undefined
  const processedFiles = children.reduce((acc: any, v: any) => {
    const filename: string = v.props.children.props.filename
    const isMain: boolean = v.props.children.props.main
    if (isMain) {
      if (main) {
        throw new Error('Two files set themselves as main.')
      }
      main = filename
    }
    const isSelected: boolean = v.props.children.props.selected
    if (isSelected) {
      if (selected) {
        throw new Error('Two files set themselves as selected.')
      }
      selected = filename
    }
    const code: string = v.props.children.props.children.trim()
    const file: PlaygroundFile = {
      filename,
      code,
    }
    return {
      ...acc,
      [filename]: file,
    }
  }, {})
  if (!main) {
    throw new Error('Could not find main.')
  }
  const order = Object.keys(processedFiles)
  return {
    lastFileId: 0,
    files: processedFiles,
    order,
    main,
    selected: selected === undefined ? order[0] : selected,
  }
}
