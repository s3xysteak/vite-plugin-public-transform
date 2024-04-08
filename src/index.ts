import type { Plugin } from 'vite'
import { resolveOptions } from './resolve'

export type PublicTransformSearch = string | RegExp | string[]
export interface PublicTransformOptions {
  /**
   * Replace the specified string or regular expression with the base path.
   */
  search: PublicTransformSearch

  replace: (base: string) => string
}

/** @default '/public/' */
export type PublicTransformParams = PublicTransformSearch | Partial<PublicTransformOptions>

function entry(options: PublicTransformParams = '/public/'): Plugin {
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
