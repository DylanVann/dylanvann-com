import { PlaygroundTransform } from './Playground'
import { compile } from 'svelte/compiler'

console.log(compile)

/**
 * Transform Svelte to JS.
 *
 * This is done using the Svelte compiler.
 */
export const transformSvelte: PlaygroundTransform = (v) => {
  const newCode = compile(v.code, {
    filename: v.filename,
    format: 'esm',
    css: true,
  })
  return {
    ...v,
    filename: v.filename.replace('.svelte', '.js'),
    code: newCode.js.code,
    map: newCode.js.map,
  }
}
