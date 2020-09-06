import { PlaygroundTransform } from './Playground'
import { transform, registerPlugin } from '@babel/standalone'
import babelPluginTransformImportToSkypackImport from './babel-plugin-transform-import-to-skypack-import'

registerPlugin(
  'babel-plugin-transform-import-to-skypack-import',
  babelPluginTransformImportToSkypackImport({ react: '16.13.1' }, (message) =>
    console.warn(message),
  ),
)

export const transformBabel: PlaygroundTransform = (file) => {
  const result = transform(file.code, {
    presets: [
      ['react', { runtime: 'classic' }],
      ['env', { modules: false, targets: 'Chrome > 40', loose: true }],
    ],
    plugins: ['babel-plugin-transform-import-to-skypack-import'],
  })
  return {
    ...file,
    code: result.code,
  }
}
