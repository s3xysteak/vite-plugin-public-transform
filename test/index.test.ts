import { describe, expect, it } from 'vitest'
import { resolveSearch } from '@/resolve'

describe('resolveSearch', () => {
  it('should work with string', () => {
    expect(resolveSearch('/public/')).toBe('/public/')
  })

  it('should work with RegExp', () => {
    const val = resolveSearch(/\/public\//g)
    expect(val).toBeInstanceOf(RegExp)
    expect(val).toEqual(/\/public\//g)
  })

  it('should work with string[]', () => {
    const val = resolveSearch(['/public/', '/assets/'])
    expect(val).toBeInstanceOf(RegExp)
    expect(val).toEqual(/\/public\/|\/assets\//g)
  })
})
