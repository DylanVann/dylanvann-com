import { PlaygroundTransform } from './Playground'

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
