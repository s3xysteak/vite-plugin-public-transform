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

It can receive a string, which will be replaced.

> In default it is `/public/`.

```js
// vite.config.js
VitePluginPublic('~public/')

// main.ts
document.querySelector('#app').innerHTML = `
  <img src="~public/it-worked.svg" />
`
```

Or a RegExp ( Do not forget to use `global` mark! )

```js
// vite.config.js
VitePluginPublic(/~public/g)

// main.ts
document.querySelector('#app').innerHTML = `
  <img src="~public/it-worked.svg" />
`
```

Or a string array, to represent multiple replacement targets.

```js
// vite.config.js
VitePluginPublic(['/public/', '~p/'])

// main.ts
document.querySelector('#app').innerHTML = `
  <img src="/public/it-worked.svg" />
`
document.querySelector('#twin').innerHTML = `
  <img src="~p/it-worked.svg" />
`
```

## License

[MIT](./LICENSE) :heart:
