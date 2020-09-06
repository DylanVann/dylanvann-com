/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, {
  useContext,
  useCallback,
  Fragment,
  useState,
  useMemo,
} from 'react'
import Editor from 'react-simple-code-editor'
import Highlight from 'prism-react-renderer'
import memoizeOne from 'memoize-one'
import Prism from 'prismjs'
import { fontRoboto } from '../../styles'
import capsize from 'capsize'
import { transformImports } from './transformImports'
import { transformBabel } from './transformBabel'

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
  isMain: boolean
}

type PromiseOrValue<T> = Promise<T> | T

/**
 * Transform a single file.
 */
export type PlaygroundTransform = (
  file: PlaygroundFile,
) => PromiseOrValue<PlaygroundFile>

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

type ApplyTransformCache = { [filename: string]: any }
type ApplyTransformCacheOnChange = React.Dispatch<
  React.SetStateAction<ApplyTransformCache>
>

const PlaygroundContext = React.createContext<
  PlaygroundPropsInternal & {
    applyTransformCache: ApplyTransformCache
    applyTransformCacheOnChange: ApplyTransformCacheOnChange
  }
>(null as any)

const theme = {
  plain: {},
  styles: [],
}

const getExtension = (filename: string): string | undefined =>
  filename.split('.').pop()

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
  filesEntries.forEach(([filename, content]) => {
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

/**
 * Constructs snippet from individual html, css and js code.
 */
export function constructSnippet({ files }: { files: PlaygroundFiles }) {
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
    if (a.isMain) {
      return 1
    }
    if (b.isMain) {
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

function PlaygroundEditor() {
  const { files, filesOnChange, selectedFile } = useContext(PlaygroundContext)
  const highlightCode = useCallback(
    (code) => (
      <Highlight
        Prism={Prism as any}
        code={code}
        theme={theme}
        language={'javascript'}
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
    [],
  )
  const file = files[selectedFile]
  const value = file.code
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
        textarea: {
          outline: 'none',
        },
      }}
      style={{
        whiteSpace: 'pre',
        fontFamily: 'monospace',
        background: '#f5f7ff',
        fontSize: '14px',
        ...baseTheme,
      }}
    />
  )
}

function PlaygroundError() {
  return null
  // return (
  //   <div style={{ border: '1px solid red', background: '#f5f7ff' }}>
  //     The error.
  //   </div>
  // )
}

const applyTransforms = (
  filename: string,
  code: string,
  isMain: boolean,
  transforms: PlaygroundTransform[],
): PromiseOrValue<PlaygroundFile> => {
  const file: PlaygroundFile = {
    filename,
    code,
    isMain,
  }
  let transformed = file
  transforms.forEach((t) => (transformed = t(transformed)))
  return transformed
}

const transformFiles = (
  files: PlaygroundFiles,
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
      [filename]: memoizedApplyTransform(
        file,
        transformsForExtension,
      ),
    }
  }, {})
}

function PlaygroundPreview() {
  const { files, transforms, main, applyTransformCache } = useContext(
    PlaygroundContext,
  )
  // Transform the files and change structure.
  const playgroundFiles = useMemo(
    () => transformFiles(files, transforms, applyTransformCache),
    [files, main, transforms, applyTransformCache],
  )
  const code = useMemo(() => constructSnippet({ files: playgroundFiles }), [
    playgroundFiles,
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
      srcDoc={code}
      // @ts-ignore
      loading="lazy"
    />
  )
}

const mainDefault = 'index.js'

const filesDefaultV: PlaygroundFiles = {
  [mainDefault]: {
    filename: mainDefault,
    code: `document.body.appendChild(document.createTextNode('hello world'))`,
    isMain: true,
  },
}
const selectedFileDefaultV = mainDefault
const fileOrderDefaultV = [mainDefault]
const transformsDefault = {
  js: [transformBabel, transformImports],
}

function PlaygroundProvider({
  main = mainDefault,
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
  }
  return (
    <PlaygroundContext.Provider value={finalProps}>
      {children}
    </PlaygroundContext.Provider>
  )
}

function PlaygroundEditorTab(props: { filename: string }) {
  const { filename } = props
  const {
    selectedFile,
    files,
    selectedFileOnChange,
    filesOnChange,
  } = useContext(PlaygroundContext)
  const isSelected = filename === selectedFile ? 'red' : undefined
  return (
    <div
      key={filename}
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
          selectedFileOnChange(filename)
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
                  const file: PlaygroundFile = files[filename]
                  filesOnChange((v) => ({
                    ...v,
                    [filename]: {
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
            delete clonedFiles[filename]
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
  const { files, filesOnChange } = useContext(PlaygroundContext)
  return (
    <div style={{ display: 'flex', marginBottom: -2, marginTop: 4 }}>
      {Object.keys(files).map((filename) => (
        <PlaygroundEditorTab key={filename} filename={filename} />
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
          const id = 'idk.js'
          filesOnChange((v) => ({
            ...v,
            [id]: {
              filename: 'idk.js',
              code: 'const god = "dam"',
              isMain: false,
            },
          }))
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
  const files: PlaygroundFiles = useMemo<PlaygroundFiles>(() => {
    return children.reduce((acc, v) => {
      const filename: string = v.props.children.props.filename
      const code: string = v.props.children.props.children.trim()
      const file: PlaygroundFile = {
        filename,
        code,
        isMain: false,
      }
      return {
        ...acc,
        [filename]: file,
      }
    }, {})
  }, [children])
  return (
    <PlaygroundProvider {...props} files={files}>
      <div style={style} className={className}>
        <PlaygroundPreview />
        <PlaygroundError />
        <PlaygroundEditorTabs />
        <div style={{ border: '1px solid rgb(204, 214, 252)' }}>
          <PlaygroundEditor />
        </div>
      </div>
    </PlaygroundProvider>
  )
}
