/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, {
  useContext,
  useCallback,
  Fragment,
  useState,
  useMemo,
  useEffect,
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

type PromiseOrValue<T> = Promise<T> | T

/**
 * Transform a single file.
 */
export type PlaygroundTransform = (
  file: PlaygroundFile,
  main: string,
) => PlaygroundFile

/**
 * A mapping of file id to file contents.
 *
 * @defaultValue {"index.js": "console.log('hello world')"}
 */
type PlaygroundFiles = {
  [id: string]: PlaygroundFile
}

type PlaygroundTransformMap = {
  [extension: string]: PlaygroundTransform[]
}

/**
 * Props of the Playground component.
 */
export interface PlaygroundProps {
  /**
   * The file to use as the main file.
   * Meaning the file to be executed on the rendered page.
   *
   * @defaultValue 'index.js'
   */
  main?: string
  /**
   * A preset main file, that will import and use the default export of App.js.
   * App.js could be generated from app.tsx, app.svelte, app.res, etc.
   *
   * This is used to avoid needing to write `ReactDOM.render` (React) or `new App(...)` (Svelte).
   *
   * - `react` preset will import a component from `index.js` and render it.
   * - `svelte` preset will import a component from `index.svelte` and render it.
   *
   * If the user creates an index.js file it will be created with the content from the preset.
   * This is an escape hatch for if the user wishes to modify the index.js code.
   *
   * @defaultValue undefined
   */
  mainPreset?: 'react' | 'svelte'
  /**
   * A mapping of filename to file contents.
   *
   * @defaultValue {"index.js": "console.log('hello world')"}
   */
  files: PlaygroundFiles
  filesControlled?: PlaygroundFiles
  filesOnChange?: React.Dispatch<React.SetStateAction<PlaygroundFiles>>
  /**
   * A mapping of file extension to {@link PlaygroundTransform} or an array of {@link PlaygroundTransform}.
   * If an array is given the transforms will be applied sequentially.
   *
   * @defaultValue undefined
   *
   * @example
   *
   * const myTransform = [transformTypeScript, transformBareImportsToSkypack]
   *
   * {
   *   '.ts': myTransform,
   *   '.tsx': myTransform,
   * }
   */
  transforms?: PlaygroundTransformMap
  /**
   * File order in the editor.
   */
  fileOrder: string[]
  fileOrderControlled?: string[]
  fileOrderOnChange?: React.Dispatch<React.SetStateAction<string[]>>
  /**
   * Selected file in the editor.
   */
  selectedFile: string
  selectedFileControlled?: string
  selectedFileOnChange?: React.Dispatch<React.SetStateAction<string>>
}

type RequiredAndNotNull<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>
}

type RequireAndNotNullSome<T, K extends keyof T> = RequiredAndNotNull<
  Pick<T, K>
> &
  Omit<T, K>

type PlaygroundPropsInternal = Omit<
  RequireAndNotNullSome<
    PlaygroundProps,
    | 'fileOrderOnChange'
    | 'selectedFileOnChange'
    | 'filesOnChange'
    | 'main'
    | 'transforms'
  >,
  'selectedFileControlled' | 'fileOrderControlled' | 'filesControlled'
>

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
  PlaygroundPropsInternal & {
    error: PlaygroundError
    errorOnChange: PlaygroundErrorOnChange
    applyTransformCache: ApplyTransformCache
    applyTransformCacheOnChange: ApplyTransformCacheOnChange
  }
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
  const { files, filesOnChange, selectedFile } = useContext(PlaygroundContext)
  const file = files[selectedFile]
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
      filesOnChange((files) => ({
        ...files,
        [selectedFile]: {
          ...file,
          code: newCode,
        },
      })),
    [filesOnChange, selectedFile, file],
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
        border: `1px solid ${darken(0.25, '#FF0000')}`,
        color: darken(0.25, '#FF0000'),
        backgroundColor: lighten(0.4, '#FF0000'),
      }}
    >
      {error.toString()}
    </pre>
  )
}

const transformFiles = (
  files: PlaygroundFiles,
  main: string,
  transformsMap: PlaygroundTransformMap,
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

const mainDefaultV = 'index.js'
const filesDefaultV: PlaygroundFiles = {
  [mainDefaultV]: {
    filename: mainDefaultV,
    code: `document.body.appendChild(document.createTextNode('hello world'))`,
  },
}
const selectedFileDefaultV = mainDefaultV
const fileOrderDefaultV = [mainDefaultV]
const transformsDefault = {
  js: [transformBabel, transformImports],
  svelte: [transformSvelte, transformBabel, transformImports],
}

function PlaygroundProvider({
  main = mainDefaultV,
  mainPreset,
  files: filesDefault = filesDefaultV,
  selectedFile: selectedFileDefault = selectedFileDefaultV,
  fileOrder: fileOrderDefault = fileOrderDefaultV,
  transforms = transformsDefault,
  children,
  ...other
}: PlaygroundProps & { children: React.ReactNode }) {
  const [applyTransformCache, applyTransformCacheOnChange] = React.useState({})
  const [files, filesOnChange] = useState<PlaygroundFiles>(filesDefault)
  const [selectedFile, selectedFileOnChange] = useState(selectedFileDefault)
  const [fileOrder, fileOrderOnChange] = useState(fileOrderDefault)
  const [error, errorOnChange] = useState<PlaygroundError>(null)
  const finalProps = {
    ...other,
    main,
    mainPreset,
    transforms,
    files,
    filesOnChange,
    selectedFile,
    selectedFileOnChange,
    fileOrder,
    fileOrderOnChange,
    applyTransformCache,
    applyTransformCacheOnChange,
    error,
    errorOnChange,
  }
  return (
    <PlaygroundContext.Provider value={finalProps}>
      {children}
    </PlaygroundContext.Provider>
  )
}

function PlaygroundEditorTab(props: { id: string }) {
  const { id } = props
  const {
    selectedFile,
    files,
    selectedFileOnChange,
    filesOnChange,
  } = useContext(PlaygroundContext)
  const file = files[id]
  const { filename } = file
  const isSelected = id === selectedFile ? 'red' : undefined
  return (
    <div
      css={{
        position: 'relative',
        background: isSelected ? 'rgb(245, 247, 255)' : 'transparent',
        border: isSelected
          ? '1px solid rgb(204, 214, 252)'
          : '1px solid transparent',
        borderBottom: '1px solid transparent',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <i
        css={{
          cursor: 'move',
          width: '5px',
          position: 'absolute',
          left: '5px',
          top: 6,
          bottom: 6,
          '--drag-handle-color': '#dedede',
          background:
            'linear-gradient(to right, var(--drag-handle-color) 1px, transparent 1px, transparent 2px, var(--drag-handle-color) 2px, var(--drag-handle-color) 3px, transparent 3px, transparent 4px, var(--drag-handle-color) 4px )',
        }}
      />
      <div
        css={{
          border: 0,
          background: 0,
          padding: 10,
          paddingRight: 5,
          margin: 0,
          outline: 0,
          marginLeft: 5,
          cursor: 'pointer',
          color: isSelected ? '#333' : '#555',
          ':hover': {
            color: '#000',
          },
        }}
        onClick={() => {
          selectedFileOnChange(id)
        }}
      >
        <div
          {...(isSelected
            ? {
                spellCheck: false,
                contentEditable: true,
                suppressContentEditableWarning: true,
                onInput: (e) => {
                  const value: string = e.currentTarget.textContent || ''
                  const file: PlaygroundFile = files[id]
                  filesOnChange((v) => ({
                    ...v,
                    [id]: {
                      ...file,
                      filename: value,
                    },
                  }))
                },
              }
            : {})}
          css={{
            margin: 0,
            background: 'none',
            border: 'none',
            outline: 'none',
            ...fontStyle,
            fontFamily: fontRoboto,
          }}
          defaultValue={filename}
        >
          {filename}
        </div>
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
        onClick={() => {
          filesOnChange((files) => {
            const clonedFiles = { ...files }
            delete clonedFiles[id]
            return clonedFiles
          })
        }}
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
  const { files, filesOnChange, selectedFileOnChange } = useContext(
    PlaygroundContext,
  )
  return (
    <div style={{ display: 'flex', marginBottom: -2, marginTop: 4 }}>
      {Object.keys(files).map((filename) => (
        <PlaygroundEditorTab key={filename} id={filename} />
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
        onClick={() => {
          const id = 'untitled.js'
          filesOnChange((v) => ({
            ...v,
            [id]: {
              filename: 'untitled.js',
              code: '',
            },
          }))
          selectedFileOnChange(id)
        }}
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

export function Playground(
  props: PlaygroundProps & { children: any[]; style?: any; className?: string },
) {
  const { children, style, className } = props
  const { files, main, selected } = useMemo<{
    files: PlaygroundFiles
    main?: string
    selected?: string
  }>(() => {
    let main
    let selected
    const processedFiles = children.reduce((acc, v) => {
      const filename: string = v.props.children.props.filename
      const isMain: boolean = v.props.children.props.main
      if (isMain) {
        main = filename
      }
      const isSelected: boolean = v.props.children.props.selected
      if (isSelected) {
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
    return {
      files: processedFiles,
      main,
      selected,
    }
  }, [children])
  return (
    <PlaygroundProvider
      {...props}
      files={files}
      main={main}
      selectedFile={selected as string}
    >
      <div style={style} className={className}>
        <PlaygroundPreview />
        <PlaygroundEditorTabs />
        <div style={{ border: '1px solid rgb(204, 214, 252)' }}>
          <PlaygroundEditor />
        </div>
        <PlaygroundError />
      </div>
    </PlaygroundProvider>
  )
}
