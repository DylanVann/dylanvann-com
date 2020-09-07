import camelCase from 'lodash.camelcase'
import { PlaygroundTransform, PlaygroundFile } from './Playground'

const escape = (v: string) => v.replaceAll('`', '\\`').replaceAll('$', '\\$')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unescape = (v: string) => v.replaceAll('\\`', '`').replaceAll('\\$', '$')

const getName = (filename: string): string | undefined =>
  filename.split('.').shift()

/**
 * Transform local imports to a format that will work.
 * This is implemented using a regex because bringing in a parser for it would probably add 100kb to the bundle size.
 */
export const transformImports: PlaygroundTransform = (
  file: PlaygroundFile,
  main: string,
): PlaygroundFile => {
  const name = file.filename.split('.').shift()
  const camelName = camelCase(name)
  let output = file.code
  output = escape(output)
  output = output.replaceAll(
    /from ['"]\.\/(.*)['"]/g,
    (fullMatch, importPath) => {
      const identifier = camelCase(importPath.split('.').shift())
      console.log('wtf', importPath, identifier)
      return `from '$\{${identifier}()}'`
    },
  )
  output = `var ${camelName} = () => esm\`${output}\``
  if (file.filename === main) {
    output = `${output}\nimport(${camelName}())`
  }
  return {
    ...file,
    code: output,
  }
}
