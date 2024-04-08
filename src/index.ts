import type { Plugin } from 'vite'
import { resolveSearch } from './resolve'

/**
 * Replace the specified string or regular expression with the base path.
 * @default '/public/'
 */
export type PublicTransformSearch = string | RegExp | string[]

function entry(search: PublicTransformSearch = '/public/'): Plugin {
  search = resolveSearch(search)

  let base: string

  return {
    name: 'vite-plugin-public-transform',
    configResolved(config) {
      base = config.base
    },
    transform(code) {
      return code.replace(search, base)
    },
  }
}

export default entry
