import { PlaygroundTransform } from './Playground'
import { transform, registerPlugin } from '@babel/standalone'
import babelPluginTransformImportToSkypackImport from './babel-plugin-transform-import-to-skypack-import'

registerPlugin(
  'babel-plugin-transform-import-to-skypack-import',
  babelPluginTransformImportToSkypackImport(
    {
      react: '16.13.1',
      'react-dom': '16.13.1',
      svelte: '3.24.1',
      oceanwind: '0.2.0',
    },
    (message) => console.warn(message),
  ),
)

export const transformBabel: PlaygroundTransform = (file) => {
  const result = transform(file.code, {
    presets: [['react', { runtime: 'classic' }]],
    plugins: ['babel-plugin-transform-import-to-skypack-import'],
  })
  return {
    ...file,
    code: result.code,
  }
}
