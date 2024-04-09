import type { Plugin } from 'vite'
import { resolveOptions } from './resolve'
import type { Preset } from './preset'

export type MaybeArray<T> = T | T[]

export interface PublicTransformOptions {
  /**
   * Replace the specified string or regular expression with the base path.
   */
  search: string | RegExp | string[]

  /**
   * Replace the specified string with the base path.
   */
  replace: (base: string) => string
}

/** @default '/public/' */
export type PublicTransformParams = Preset | (Partial<PublicTransformOptions> & Pick<PublicTransformOptions, 'search'>)

function entry(options?: MaybeArray<PublicTransformParams>): Plugin {
  const _options = resolveOptions(options)

  let base: string

  return {
    name: 'vite-plugin-public-transform',
    configResolved(config) {
      base = config.base
    },
    transform(code) {
      return _options.reduce((acc, option) => {
        return acc.replace(option.search, option.replace(base))
      }, code)
    },
  }
}

export default entry
