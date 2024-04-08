import type { Search } from '.'

const isString = (val: unknown): val is string => typeof val === 'string'
const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp

export function resolveSearch(search: Search): RegExp {
  if (Array.isArray(search))
    return new RegExp(search.join('|'), 'g')

  if (isString(search))
    return new RegExp(search, 'g')

  if (isRegExp(search) && !search.global)
    throw new Error('[vite-plugin-public-transform] RegExp must have global flag')

  return search
}
