import { PlaygroundTransform } from './Playground'
import { transform } from '@babel/standalone'

export const transformBabel: PlaygroundTransform = (file) => {
  console.log('TRANSFORM-----------------------------')
  const result = transform(file.code, {
    presets: [
      'react',
      ['env', { modules: false, targets: 'Chrome > 40', loose: true }],
    ],
  })
  return {
    ...file,
    code: result.code,
  }
}
