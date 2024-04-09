import { presetMap } from './preset'
import type { MaybeArray, PublicTransformOptions, PublicTransformParams } from '.'

const isString = (val: unknown): val is string => typeof val === 'string'
const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp

interface ResolveOptionsReturns extends PublicTransformOptions {
  search: RegExp
}

export function resolveOptions(options: MaybeArray<PublicTransformParams> = 'quotes-public'): ResolveOptionsReturns[] {
  const list = Array.isArray(options) ? options : [options]
  return list.map((option) => {
    const _options = isString(option) ? presetMap[option] : option

    const search = resolveSearch(_options.search)

    return Object.assign({ replace: (base: string) => base }, { ..._options, search })
  })
}

export function resolveSearch(search: PublicTransformOptions['search']): RegExp {
  if (Array.isArray(search))
    return new RegExp(search.join('|'), 'g')

  if (isString(search))
    return new RegExp(search, 'g')

  if (isRegExp(search) && !search.global)
    throw new Error('[vite-plugin-public-transform] RegExp must have global flag')

  return search
}
