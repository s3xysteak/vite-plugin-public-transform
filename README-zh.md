# :tada: vite-plugin-public-transform

[English](./README.md) | 简体中文

通过直接替换目标字符串，以改进处理静态资源的体验。

## :rocket: 使用

无论在js中还是dom中，都可以直接使用 `/public/anything`。

```html
<!-- 直接在DOM中使用路径！ -->
<img src="/public/it-worked.svg" />

<img src="${pic}" />
<img src="${logo}" />
```

```js
// 这可以生效，但是Vite会抛出一个警告。
// 推荐直接在DOM中使用路径。
import pic from '/public/pic.svg'

// Vite原生使用方法仍然正常运行。
import logo from '/logo.svg'

// 这也可以生效
await fetch('/public/geojson.json')
```

其中 `/public/` 将在编译时被替换为 [base](https://cn.vitejs.dev/config/shared-options.html#base)。

## :memo: 安装

以 `pnpm` 为例:

```sh
$ pnpm i -D vite-plugin-public-transform
```

在 `plugins` 选项中调用它。

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

## :wrench: 选项

他接受一个字符串，用于表示被替换的目标字符串。

> 默认为 `/public/`。

```js
// vite.config.js
VitePluginPublic('~public/')

// main.ts
document.querySelector('#app').innerHTML = `
  <img src="~public/it-worked.svg" />
`
```

或者一个正则 ( 别忘了用 `global` 标记! )

```js
// vite.config.js
VitePluginPublic(/~public/g)

// main.ts
document.querySelector('#app').innerHTML = `
  <img src="~public/it-worked.svg" />
`
```

或者一个字符串数组，用于表示多个替换目标。

```js
// vite.config.js
VitePluginPublic([
  '/public/',
  '~p/'
])

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
