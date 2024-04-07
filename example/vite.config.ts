import { defineConfig } from 'vite'
import VitePluginPublic from 'vite-plugin-public-transform'

export default defineConfig({
  base: '/test/',
  plugins: [
    VitePluginPublic(['~p/', '/public/']),
  ],
})
