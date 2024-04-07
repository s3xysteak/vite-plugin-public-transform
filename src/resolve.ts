import type { Search } from '.'

const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp

export function resolveSearch(search: Search) {
  if (Array.isArray(search))
    return new RegExp(search.map(s => `${s}`).join('|'), 'g')

  if (isRegExp(search) && !search.global)
    throw new Error('[vite-plugin-public-transform] RegExp must have global flag')

  return search
}
