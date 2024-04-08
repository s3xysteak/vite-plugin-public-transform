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

你也可以自定义前缀：

```js
VitePluginPublic({
  search: '~p/'
})
```

```html
<img src="~p/it-worked.svg" />
```

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

他现在有两个预设 :

```js
// VitePluginPublic('public')
VitePluginPublic('quotes-public') // 默认行为
```

他还可以高度自定义 :

```js
// 等价于 VitePluginPublic('public')
VitePluginPublic({
  // <img src="/public/logo.svg" />
  search: '/public/',
  replace: base => base,
})

// 等价于 VitePluginPublic('quotes-public')
VitePluginPublic({
  // 和上面相同，但它的规则更加保守
  search: '\"/public/',
  replace: base => `\"${base}`,
})

VitePluginPublic({
  // <img src="~p/logo.svg" />
  search: '~p/',
  // replace: base => base // 默认
})

VitePluginPublic({
  // <img src="@public/logo.svg" />
  search: /@public/g,
})

VitePluginPublic({
  // <img src="@p/logo.svg" /> <img src="~p/icon.svg" />
  search: ['@p/', '~p/'],
})
```

## License

[MIT](./LICENSE) :heart:
