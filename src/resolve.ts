import type { PublicTransformOptions, PublicTransformParams, PublicTransformSearch } from '.'

const toString = (v: any) => Object.prototype.toString.call(v)
const isObject = (val: any): val is object => toString(val) === '[object Object]'
const isString = (val: unknown): val is string => typeof val === 'string'
const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp

interface ResolveOptionsReturns extends PublicTransformOptions {
  search: RegExp
}

export function resolveOptions(options: PublicTransformParams): ResolveOptionsReturns {
  const isObj = isObject(options)

  const search = isObj
    ? resolveSearch((options as PublicTransformOptions).search)
    : resolveSearch((options as PublicTransformSearch))

  return Object.assign({ replace: (base: string) => base }, isObj ? { ...options, search } : { search })
}

export function resolveSearch(search: PublicTransformSearch): RegExp {
  if (Array.isArray(search))
    return new RegExp(search.join('|'), 'g')

  if (isString(search))
    return new RegExp(search, 'g')

  if (isRegExp(search) && !search.global)
    throw new Error('[vite-plugin-public-transform] RegExp must have global flag')

  return search
}
