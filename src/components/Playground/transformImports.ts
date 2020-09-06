import camelCase from 'lodash.camelcase'
import { PlaygroundTransform, PlaygroundFile } from './Playground'

const escape = (v: string) => v.replaceAll('`', '\\`').replaceAll('$', '\\$')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unescape = (v: string) => v.replaceAll('\\`', '`').replaceAll('\\$', '$')

/**
 * Transform local imports to a format that will work.
 * This is implemented using a regex because bringing in a parser for it would probably add 100kb to the bundle size.
 */
export const transformImports: PlaygroundTransform = (
  file: PlaygroundFile,
): PlaygroundFile => {
  const camelName = camelCase(file.filename)
  let output = file.code
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
    code: output,
  }
}
