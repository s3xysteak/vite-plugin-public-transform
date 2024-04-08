import type { PublicTransformOptions } from '.'

const defineOptions = (options: PublicTransformOptions) => options

export const presetMap = {
  'public': defineOptions({
    search: '/public/',
    replace: base => base,
  }),
  'quotes-public': defineOptions({
    search: '\"/public/',
    replace: base => `\"${base}`,
  }),
}

export type Preset = keyof typeof presetMap
