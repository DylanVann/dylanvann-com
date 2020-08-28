import React, {
  useContext,
  useCallback,
  Fragment,
  useState,
  useMemo,
  useLayoutEffect,
} from 'react'
import Editor from 'react-simple-code-editor'
import Highlight from 'prism-react-renderer'
import camelCase from 'lodash.camelcase'
import memoizeOne from 'memoize-one'
import Prism from 'prismjs'

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
  name: string
  /**
   * The file contents.
   *
   * A transform can change this in any way.
   */
  content: string
  isMain: boolean
}

export type PlaygroundFileMap = { [key: string]: PlaygroundFile }

type ValueOrPromise<ValueType> = ValueType | Promise<ValueType>

/**
 * Transform a single file.
 */
export type PlaygroundTransform = (file: PlaygroundFile) => PlaygroundFile

/**
 * Transform Svelte to JS.
 *
 * This is done using the Svelte compiler.
 */
export const transformSvelte: PlaygroundTransform = (v) => v

/**
 * Transform TypeScript to JS.
 *
 * This does not check types.
 *
 * This is done using esbuild.
 */
export const transformTypeScript: PlaygroundTransform = (v) => v

const escape = (v: string) => v.replaceAll('`', '\\`').replaceAll('$', '\\$')

const unescape = (v: string) => v.replaceAll('\\`', '`').replaceAll('\\$', '$')

/**
 * j
 * Transform local imports to a format that will work.
 * This is implemented using a regex because bringing in a parser for it would probably add 100kb to the bundle size.
 */
export const transformImports: PlaygroundTransform = (
  file: PlaygroundFile,
): PlaygroundFile => {
  const camelName = camelCase(file.name)
  let output = file.content
  output = escape(output)
  output = output.replaceAll(/from '(.*)'/g, (fullMatch, importPath) => {
    return `from '$\{${camelCase(importPath)}()}'`
  })
  output = `var ${camelName} = () => esm\`${output}\``
  if (file.isMain) {
    output = `${output}\nimport(${camelName}())`
  }
  return {
    ...file,
    content: output,
  }
}

/**
 * Transforms bare imports to imports from Skypack (https://www.skypack.dev).
 *
 * @example
 *
 * // If you want to import lodash:
 * import lodash from 'lodash'
 *
 * // Will be transformed to:
 * import lodash from 'https://cdn.skypack.dev/lodash'
 *
 * @example
 *
 * // If you want your code to keep working you could set a version:
 * import lodash from 'lodash@4.17.15'
 *
 * // Will be transformed to:
 * import lodash from 'https://cdn.skypack.dev/lodash@4.17.15'
 */
export const transformBareImportsToSkypack: PlaygroundTransform = (v) => v

/**
 * A mapping of filename to file contents.
 *
 * @defaultValue {"index.js": "console.log('hello world')"}
 */
type PlaygroundFiles = {
  [filename: string]: string
}

type PlaygroundTransformMap = {
  [extension: string]: PlaygroundTransform | PlaygroundTransform[]
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
    main,
    mainPreset,
    transforms: transformsDefault,
    ...other,
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

const theme = {
  plain: {},
  styles: [],
}

const getExtension = (filename: string): string | undefined =>
  filename.split('.').pop()

const sortFiles = (
  files: PlaygroundFileMap,
): {
  css: PlaygroundFileMap
  js: PlaygroundFileMap
  html?: PlaygroundFile
} => {
  const sortedFiles: {
    css: PlaygroundFileMap
    js: PlaygroundFileMap
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
export function constructSnippet(
  { files }: { files: PlaygroundFileMap },
  id: string | number,
) {
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
  .map((css) => `<style>${css.content}</style>`)
  .join('\n')}
</head>
<body>
${sortedFiles.html ? sortedFiles.html.content : ''}
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
  .map((js) => `${js.content}`)
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
        theme={undefined}
        // theme={{
        //   ...theme,
        // }}
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
  const value = files[selectedFile]
  const onValueChange = useCallback(
    (newCode) => filesOnChange({ ...files, [selectedFile]: newCode }),
    [selectedFile, filesOnChange, files],
  )
  const baseTheme = theme && typeof theme.plain === 'object' ? theme.plain : {}
  return (
    <Editor
      value={value}
      onValueChange={onValueChange}
      padding={20}
      highlight={highlightCode}
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

function PlaygroundError(props: any) {
  return (
    <div style={{ border: '1px solid red', background: '#f5f7ff' }}>
      The error.
    </div>
  )
}

const applyTransform = (
  name: string,
  content: string,
  isMain: boolean,
  transform: PlaygroundTransform | PlaygroundTransform[] | undefined,
) => {
  const file = {
    name,
    content,
    isMain,
  }
  if (!transform) {
    return file
  }
  if (transform instanceof Array) {
    let transformed = file
    transform.forEach((t) => (transformed = t(transformed)))
    return transformed
  } else {
    return transform(file)
  }
}

const transformFiles = (
  files: PlaygroundFiles,
  main: string,
  transforms: PlaygroundTransformMap,
  applyTransformCache: ApplyTransformCache,
): PlaygroundFileMap => {
  return Object.entries(files).reduce((acc, [name, content]) => {
    const extension = getExtension(name)
    if (!extension) {
      throw new Error('File does not have extension.')
    }
    const transform = transforms[extension]
    const isMain = name === main
    let memoizedApplyTransform = applyTransformCache[name]
    if (!memoizedApplyTransform) {
      memoizedApplyTransform = memoizeOne(applyTransform)
      applyTransformCache[name] = memoizedApplyTransform
    }
    return {
      ...acc,
      [name]: memoizedApplyTransform(name, content, isMain, transform),
    }
  }, {})
}

function PlaygroundPreview() {
  const { files, transforms, main, applyTransformCache } = useContext(
    PlaygroundContext,
  )
  // Transform the files and change structure.
  const playgroundFiles = useMemo(
    () => transformFiles(files, main, transforms, applyTransformCache),
    [files, main, transforms, applyTransformCache],
  )
  const code = useMemo(
    () => constructSnippet({ files: playgroundFiles }, '10'),
    [playgroundFiles],
  )
  return (
    <iframe
      style={{ border: '1px solid rgb(236, 236, 236)', display: 'block' }}
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
const filesDefaultV = {
  [mainDefault]: `document.body.appendChild(document.createTextNode('hello world'))`,
}
const selectedFileDefaultV = mainDefault
const fileOrderDefaultV = [mainDefault]
const transformsDefault = {
  js: transformImports,
}

function PlaygroundEditorTabs() {
  const {
    files,
    selectedFile,
    selectedFileOnChange,
    filesOnChange,
  } = useContext(PlaygroundContext)
  return (
    <div style={{ border: '1px solid black', display: 'flex' }}>
      {Object.keys(files).map((filename) => (
        <div
          key={filename}
          style={{
            background: filename === selectedFile ? 'red' : undefined,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <button
            style={{
              border: 0,
              background: 0,
              padding: 10,
              margin: 0,
              outline: 0,
            }}
            onClick={() => {
              selectedFileOnChange(filename)
            }}
          >
            {filename}
          </button>
          <button
            style={{
              border: 0,
              background: 0,
              padding: 10,
              margin: 0,
              outline: 0,
            }}
            onClick={() => {
              filesOnChange((files) => {
                const clonedFiles = { ...files }
                delete clonedFiles[filename]
                return clonedFiles
              })
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  )
}

export function PlaygroundFileIdk({
  code,
  filename,
}: {
  code: string
  filename: string
}) {
  const { filesOnChange } = useContext(PlaygroundContext)
  useLayoutEffect(() => {
    filesOnChange((files) => ({
      ...files,
      [filename]: code,
    }))
  }, [filename, code, filesOnChange])
  return null
}

export function Playground(props: PlaygroundProps & { children: any[] }) {
  const { children } = props
  const files = useMemo(() => {
    return children.reduce((acc, v) => {
      const code = v.props.children.props.children
      const filename = v.props.children.props.filename
      return {
        ...acc,
        [filename]: code,
      }
    }, {})
  }, [children])
  return (
    <PlaygroundProvider {...props} files={files}>
      <PlaygroundPreview />
      <PlaygroundError />
      <PlaygroundEditorTabs />
      <PlaygroundEditor />
    </PlaygroundProvider>
  )
}
