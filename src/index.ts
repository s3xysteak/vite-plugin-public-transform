import type { Plugin } from 'vite'
import { resolveOptions } from './resolve'
import type { Preset } from './preset'

export interface PublicTransformOptions {
  /**
   * Replace the specified string or regular expression with the base path.
   */
  search: string | RegExp | string[]

  replace: (base: string) => string
}

/** @default '/public/' */
export type PublicTransformParams = Preset | (Partial<PublicTransformOptions> & Pick<PublicTransformOptions, 'search'>)

function entry(options?: PublicTransformParams): Plugin {
  const _options = resolveOptions(options)

  let base: string

  return {
    name: 'vite-plugin-public-transform',
    configResolved(config) {
      base = config.base
    },
    transform(code) {
      return code.replace(_options.search, _options.replace(base))
    },
  }
}

export default entry
