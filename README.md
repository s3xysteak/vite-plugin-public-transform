# :tada: vite-plugin-public-transform

English | [简体中文](./README-zh.md)

Improving the handling of static resources in Vite through replacing target string directly.

## :rocket: Usage

Just use `/public/anything` directly, whatever in js or dom.

```html
<!-- Directly use the path in DOM! -->
<img src="/public/it-worked.svg" />

<img src="${pic}" />
<img src="${logo}" />
```

```js
// It can work but Vite will throw a warn.
// Recommend use `url` in `Dom` directly.
import pic from '/public/pic.svg'

// The original usage can also work.
import logo from '/logo.svg'

// It can also work.
await fetch('/public/geojson.json')
```

`/public/` will be replaced with [base](https://vitejs.dev/config/shared-options.html#base) during compilation.

You can also customize prefix :

```js
VitePluginPublic({
  search: '~p/'
})
```

```html
<img src="~p/it-worked.svg" />
```

## :memo: Install

Taking `pnpm` as an example:

```sh
$ pnpm i -D vite-plugin-public-transform
```

Call it in `plugins` option.

```js
import { defineConfig } from 'vite'
import VitePluginPublic from 'vite-plugin-public-transform'

export default defineConfig({
  plugins: [
    // ...
    VitePluginPublic()
  ]
})
```

## :wrench: Options

Now it has two presets :

```js
// VitePluginPublic('public')
VitePluginPublic('quotes-public') // Default
```

It is highly customizable :

```js
// Equal to VitePluginPublic('public')
VitePluginPublic({
  // <img src="/public/logo.svg" />
  search: '/public/',
  replace: base => base,
})

// Equal to VitePluginPublic('quotes-public')
VitePluginPublic({
  // Same as above but its rule is more conservative.
  search: '\"/public/',
  replace: base => `\"${base}`,
})

VitePluginPublic({
  // <img src="~p/logo.svg" />
  search: '~p/',
  // replace: base => base // default
})

VitePluginPublic({
  // <img src="@public/logo.svg" />
  search: /@public\//g,
})

VitePluginPublic({
  // <img src="@p/logo.svg" /> <img src="~p/icon.svg" />
  search: ['@p/', '~p/'],
})
```

## License

[MIT](./LICENSE) :heart:
