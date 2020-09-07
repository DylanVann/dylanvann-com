/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, {
  Dispatch,
  useContext,
  useCallback,
  Fragment,
  useState,
  useMemo,
  useEffect,
  useReducer,
  useLayoutEffect,
} from 'react'
import Editor from 'react-simple-code-editor'
import Highlight from 'prism-react-renderer'
import memoizeOne from 'memoize-one'
import { Prism } from '../Prism'
import { fontRoboto } from '../../styles'
import capsize from 'capsize'
import { transformImports } from './transformImports'
import { transformBabel } from './transformBabel'
import { darken, lighten } from 'polished'
import { transformSvelte } from './transformSvelte'
import { getExtension } from './utils'

const fontMetrics = {
  capHeight: 1456,
  ascent: 1900,
  descent: -500,
  lineGap: 0,
  unitsPerEm: 2048,
}

const fontStyle = capsize({
  fontMetrics,
  capHeight: 10,
  lineGap: 0,
})

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (find: string | RegExp, replace: any) {
    return this.split(find).join(replace)
  }
}

type PromiseOrValue<T> = Promise<T> | T

/**
 * File interface.
 */
export interface PlaygroundFile {
  /**
   * The filename.
   *
   * A transform can change this name when returning, e.g. the TypeScript transform will change `example.ts` to `example.js`.
   */
  filename: string
  /**
   * The file contents.
   *
   * A transform can change this in any way.
   */
  code: string
}

/**
 * A mapping of file id to file contents.
 *
 * @defaultValue {"index.js": "console.log('hello world')"}
 */
type PlaygroundFiles = {
  [id: string]: PlaygroundFile
}

/**
 * Transform a single file.
 */
export type PlaygroundTransform = (
  file: PlaygroundFile,
  main: string,
) => PlaygroundFile

/**
 * A mapping of extension to an array of transforms.
 */
type PlaygroundTransforms = {
  [extension: string]: PlaygroundTransform[]
}

interface State {
  lastFileId: number
  files: PlaygroundFiles
  main: string
  order: string[]
  selected: string
}

type Action =
  | { type: 'onClickedNewFile' }
  | { type: 'onClickedDeleteFile'; id: string }
  | { type: 'onClickedFile'; id: string }
  | { type: 'onChangedFilename'; id: string; name: string }
  | {
      type: 'onChangedFile'
      id: string
      code: string
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'onChangedFilename': {
      const { id, name } = action
      return {
        ...state,
        files: {
          ...state.files,
          [id]: {
            ...state.files[id],
            filename: name,
          },
        },
      }
    }
    case 'onClickedFile': {
      const { id } = action
      return {
        ...state,
        selected: id,
      }
    }
    case 'onChangedFile': {
      const { id } = action
      return {
        ...state,
        files: {
          ...state.files,
          [id]: {
            ...state.files[id],
            code: action.code,
          },
        },
      }
    }
    case 'onClickedDeleteFile': {
      const { id } = action
      const filesClone = { ...state.files }
      delete filesClone[id]
      const order = state.order.filter((v) => v !== id)
      return {
        ...state,
        order,
        selected: state.selected === id ? order[0] : state.selected,
        files: filesClone,
      }
    }
    case 'onClickedNewFile': {
      const id = (state.lastFileId + 1).toString()
      return {
        ...state,
        lastFileId: state.lastFileId + 1,
        order: [...state.order, id],
        selected: id,
        files: {
          ...state.files,
          [id]: {
            filename: 'untitled.js',
            code: '',
          },
        },
      }
    }
  }
}

const applyTransforms = (
  file: PlaygroundFile,
  main: string,
  transforms: PlaygroundTransform[],
): PlaygroundFile => {
  let transformed = file
  transforms.forEach((t) => (transformed = t(transformed, main)))
  return transformed
}

type ApplyTransformCache = { [filename: string]: typeof applyTransforms }
type ApplyTransformCacheOnChange = React.Dispatch<
  React.SetStateAction<ApplyTransformCache>
>

type PlaygroundError = string | null
type PlaygroundErrorOnChange = React.Dispatch<
  React.SetStateAction<PlaygroundError>
>

const PlaygroundContext = React.createContext<
  {
    transforms: PlaygroundTransforms
    error: PlaygroundError
    errorOnChange: PlaygroundErrorOnChange
    applyTransformCache: ApplyTransformCache
    applyTransformCacheOnChange: ApplyTransformCacheOnChange
    dispatch: Dispatch<Action>
  } & State
>(null as any)

const theme = {
  plain: {},
  styles: [],
}

const sortFiles = (
  files: PlaygroundFiles,
): {
  css: PlaygroundFiles
  js: PlaygroundFiles
  html?: PlaygroundFile
} => {
  const sortedFiles: {
    css: PlaygroundFiles
    js: PlaygroundFiles
    html?: PlaygroundFile
  } = { css: {}, js: {}, html: undefined }
  const filesEntries = Object.entries(files)
  filesEntries.forEach(([_id, content]) => {
    const { filename } = content
    const extension = getExtension(filename)
    if (extension === 'js') {
      sortedFiles.js[filename] = content
    }
    if (extension === 'css') {
      sortedFiles.css[filename] = content
    }
    if (extension === 'html') {
      if (filename !== 'index.html') {
        throw new Error(
          `Only index.html is supported, please rename or delete ${filename}.`,
        )
      }
      sortedFiles.html = content
    }
  })
  return sortedFiles
}

export function getSrcDoc({
  files,
  main,
}: {
  files: PlaygroundFiles
  main: string
}) {
  const sortedFiles = sortFiles(files)
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="ie=edge"/>
<title>Document</title>
${Object.values(sortedFiles.css)
  .map((css) => `<style>${css.code}</style>`)
  .join('\n')}
</head>
<body>
${sortedFiles.html ? sortedFiles.html.code : ''}
<script>
var unescape = (v) => v.replaceAll('\\\\\`', '\`').replaceAll('\\\\$', '$')
var esm = ({ raw }, ...vals) => {
  const rawString = String.raw({ raw }, ...vals)
  return URL.createObjectURL(
    new Blob([unescape(rawString)], { type: 'text/javascript' }),
  )
}

${Object.values(sortedFiles.js)
  .sort((a, b) => {
    if (a.filename === main) {
      return 1
    }
    if (b.filename === main) {
      return -1
    }
    return 0
  })
  .map((js) => `${js.code}`)
  .join('\n\n')}
</script>
</body>
</html>
`
}

const extensionToLanguage: { [ext: string]: string } = {
  js: 'jsx',
  jsx: 'jsx',
  svelte: 'svelte',
}

function PlaygroundEditor() {
  const { files, dispatch, selected } = useContext(PlaygroundContext)
  const file = files[selected]
  const { filename } = file
  const extension = getExtension(filename)
  const language = extensionToLanguage[extension]
  const value = file.code
  const highlightCode = useCallback(
    (code) => (
      <Highlight
        Prism={Prism as any}
        code={code}
        theme={theme}
        language={language as any}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <Fragment>
            {tokens.map((line, i) => (
              // eslint-disable-next-line react/jsx-key
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  // eslint-disable-next-line react/jsx-key
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Fragment>
        )}
      </Highlight>
    ),
    [language],
  )
  const onValueChange = useCallback(
    (newCode) =>
      dispatch({ type: 'onChangedFile', id: selected, code: newCode }),
    [dispatch, selected],
  )
  const baseTheme = theme && typeof theme.plain === 'object' ? theme.plain : {}
  return (
    <Editor
      value={value}
      onValueChange={onValueChange}
      padding={20}
      highlight={highlightCode}
      css={{
        overflowX: 'scroll',
        textarea: {
          overflowX: 'scroll',
          outline: 'none',
        },
      }}
      style={{
        whiteSpace: 'pre',
        fontFamily: 'monospace',
        background: '#f5f7ff',
        overflowX: 'scroll',
        fontSize: '14px',
        ...baseTheme,
      }}
    />
  )
}

function PlaygroundError() {
  const { error } = useContext(PlaygroundContext)
  if (!error) {
    return null
  }
  return (
    <pre
      style={{
        display: 'block',
        margin: 0,
        padding: 10,
        marginTop: 4,
        fontSize: '14px',
        lineHeight: '14px',
        color: darken(0.25, '#FF0000'),
        backgroundColor: lighten(0.4, '#FF0000'),
        overflowX: 'auto',
      }}
    >
      {error.toString()}
    </pre>
  )
}

const transformFiles = (
  files: PlaygroundFiles,
  main: string,
  transformsMap: PlaygroundTransforms,
  applyTransformCache: ApplyTransformCache,
): PlaygroundFiles => {
  return Object.entries(files).reduce((acc, [_id, file]) => {
    const filename = file.filename
    const extension = getExtension(filename)
    if (!extension) {
      throw new Error('File does not have extension.')
    }
    const transformsForExtension = transformsMap[extension] || []
    let memoizedApplyTransform = applyTransformCache[filename]
    if (!memoizedApplyTransform) {
      memoizedApplyTransform = memoizeOne(applyTransforms)
      applyTransformCache[filename] = memoizedApplyTransform
    }
    return {
      ...acc,
      [filename]: memoizedApplyTransform(file, main, transformsForExtension),
    }
  }, {})
}

function PlaygroundPreview() {
  const {
    files,
    transforms,
    applyTransformCache,
    errorOnChange,
    main,
  } = useContext(PlaygroundContext)
  const [transformedFiles, setTransformedFiles] = useState<PlaygroundFiles>({})

  useEffect(() => {
    try {
      const result = transformFiles(
        files,
        main,
        transforms,
        applyTransformCache,
      )
      setTransformedFiles(result)
      errorOnChange(null)
    } catch (e) {
      errorOnChange(e)
    }
  }, [files, transforms, applyTransformCache, errorOnChange, main])

  const srcDoc = useMemo(() => getSrcDoc({ files: transformedFiles, main }), [
    main,
    transformedFiles,
  ])

  return (
    <iframe
      style={{
        border: '1px solid rgb(236, 236, 236)',
        display: 'block',
        margin: 0,
        padding: 0,
      }}
      height={200}
      width="100%"
      frameBorder="0"
      srcDoc={srcDoc}
      // @ts-ignore
      loading="lazy"
    />
  )
}

const transformsDefault = {
  js: [transformBabel, transformImports],
  svelte: [transformSvelte, transformBabel, transformImports],
}

function PlaygroundProvider({
  state,
  dispatch,
  transforms = transformsDefault,
  children,
  ...other
}: {
  transforms?: PlaygroundTransforms
  state: State
  dispatch: Dispatch<Action>
  children: React.ReactNode
}) {
  const [applyTransformCache, applyTransformCacheOnChange] = React.useState({})
  const [error, errorOnChange] = useState<PlaygroundError>(null)
  const finalProps = {
    ...other,
    ...state,
    transforms,
    applyTransformCache,
    applyTransformCacheOnChange,
    error,
    errorOnChange,
    dispatch,
  }
  return (
    <PlaygroundContext.Provider value={finalProps}>
      {children}
    </PlaygroundContext.Provider>
  )
}

function PlaygroundEditorTab(props: { id: string }) {
  const { id } = props
  const { selected, files, dispatch } = useContext(PlaygroundContext)
  const file = files[id]
  const { filename } = file
  const isSelected = id === selected
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  useLayoutEffect(() => {
    if (ref) {
      ref.textContent = filename
    }
  }, [ref, filename])
  return (
    <div
      css={{
        position: 'relative',
        background: isSelected ? 'rgb(245, 247, 255)' : 'transparent',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        css={{
          border: 0,
          background: 0,
          padding: 10,
          paddingRight: 5,
          margin: 0,
          outline: 0,
          cursor: 'pointer',
          color: isSelected ? '#333' : '#555',
          ':hover': {
            color: '#000',
          },
        }}
        onClick={() => dispatch({ type: 'onClickedFile', id })}
      >
        <div
          {...(isSelected
            ? {
                spellCheck: false,
                contentEditable: true,
                suppressContentEditableWarning: true,
                onInput: (e) => {
                  const value: string = e.currentTarget.textContent || ''
                  dispatch({ type: 'onChangedFilename', id, name: value })
                },
              }
            : {})}
          ref={(el) => setRef(el)}
          css={{
            margin: 0,
            background: 'none',
            border: 'none',
            outline: 'none',
            ...fontStyle,
            fontFamily: fontRoboto,
          }}
        />
      </div>
      <button
        css={{
          border: 0,
          background: 0,
          padding: 10,
          paddingLeft: 5,
          margin: 0,
          outline: 0,
          cursor: 'pointer',
          color: 'silver',
          ':hover': {
            color: 'black',
          },
        }}
        onClick={() => dispatch({ type: 'onClickedDeleteFile', id })}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          css={{
            display: 'block',
            width: 12,
            height: 12,
            overflow: 'hidden',
            verticalAlign: 'middle',
            OObjectFit: 'contain',
            objectFit: 'contain',
            WebkitTransformOrigin: 'center center',
            transformOrigin: 'center center',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            fill: 'none',
          }}
        >
          <line stroke="currentColor" x1="18" y1="6" x2="6" y2="18"></line>
          <line stroke="currentColor" x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  )
}

function PlaygroundEditorTabs() {
  const { dispatch, order } = useContext(PlaygroundContext)
  return (
    <div
      css={{
        display: 'flex',
        marginBottom: -2,
        marginTop: 4,
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': { width: 0, height: 0 },
      }}
    >
      {order.map((id) => (
        <PlaygroundEditorTab key={id} id={id} />
      ))}
      <button
        css={{
          border: 0,
          background: 0,
          padding: 10,
          paddingLeft: 5,
          margin: 0,
          outline: 0,
          cursor: 'pointer',
          color: 'silver',
          ':hover': {
            color: 'black',
          },
        }}
        onClick={() => dispatch({ type: 'onClickedNewFile' })}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          css={{
            display: 'block',
            width: 12,
            height: 12,
            overflow: 'hidden',
            verticalAlign: 'middle',
            OObjectFit: 'contain',
            objectFit: 'contain',
            transformOrigin: 'center center',
            stroke: 'currentColor',
            strokeWidth: '4',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            fill: 'none',
          }}
        >
          <line stroke="currentColor" x1="12" y1="0" x2="12" y2="24"></line>
          <line stroke="currentColor" x1="0" y1="12" x2="24" y2="12"></line>
        </svg>
      </button>
    </div>
  )
}

export function Playground(props: {
  children: any[]
  style?: any
  className?: string
}) {
  const { children, style, className } = props
  const initialState: State = useMemo<State>(() => {
    let main: string | undefined
    let selected: string | undefined
    const processedFiles = children.reduce((acc, v) => {
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
  }, [children])
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <PlaygroundProvider state={state} dispatch={dispatch}>
      <div style={style} className={className}>
        <PlaygroundPreview />
        <PlaygroundEditorTabs />
        <PlaygroundEditor />
        <PlaygroundError />
      </div>
    </PlaygroundProvider>
  )
}
