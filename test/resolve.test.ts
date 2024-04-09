import { describe, expect, it } from 'vitest'
import { resolveOptions, resolveSearch } from '@/resolve'

describe('resolveSearch', () => {
  it('should work with string', () => {
    expect(resolveSearch('/public/')).toEqual(/\/public\//g)
  })

  it('should work with RegExp', () => {
    const val = resolveSearch(/\/public\//g)
    expect(val).toEqual(/\/public\//g)
  })

  it('should work with string[]', () => {
    const val = resolveSearch(['/public/', '/assets/'])
    expect(val).toEqual(/\/public\/|\/assets\//g)
  })
})

describe('resolveOptions', () => {
  it('should work with object', () => {
    const val = resolveOptions({ search: /\/public\//g })[0]

    expect(val.search).toEqual(/\/public\//g)
  })

  it('should work with object and string', () => {
    const val = resolveOptions({ search: '/public/' })[0]

    expect(val.search).toEqual(/\/public\//g)
  })

  it('should work with object and string[]', () => {
    const val = resolveOptions({ search: ['/public/', '/assets/'] })[0]

    expect(val.search).toEqual(/\/public\/|\/assets\//g)
  })

  it('should work with object and RegExp', () => {
    const val = resolveOptions({ search: /\/public\//g })[0]

    expect(val.search).toEqual(/\/public\//g)
  })

  it('should work with replace initial', () => {
    const val = resolveOptions({ search: '/public/', replace: (base: string) => base })[0]

    expect(val.replace('anything')).toBe('anything')
  })

  it('should work with replace customized', () => {
    const val = resolveOptions({ search: '/public/', replace: (base: string) => `do-${base}` })[0]

    expect(val.replace('anything')).toBe('do-anything')
  })

  it('should work with preset', () => {
    const val = resolveOptions('quotes-public')[0]

    expect(val.search).toEqual(/"\/public\//g)
  })

  it('should work with multiple rules', () => {
    const val = resolveOptions(['quotes-public', { search: '/public/' }])

    expect(val[0].search).toEqual(/"\/public\//g)
    expect(val[1].search).toEqual(/\/public\//g)
  })
})
