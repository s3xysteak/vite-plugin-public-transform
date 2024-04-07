import type { Plugin } from 'vite'
import { resolveSearch } from './resolve'

/**
 * Replace the specified string or regular expression with the base path.
 * @default '/public/'
 */
export type Search = string | RegExp | string[]

function entry(search: Search = '/public/'): Plugin {
  search = resolveSearch(search)

  let base: string

  return {
    name: 'vite-plugin-public-transform',
    configResolved(config) {
      base = config.base
    },
    transform(code) {
      return code.replaceAll(search, base)
    },
  }
}

export default entry
