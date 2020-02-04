---
title: 'API: srcDir プロパティ'
description: Nuxt.js アプリケーションのソースディレクトリを指定します
---

- 型: `String`
- デフォルト: [rootDir の値](/api/configuration-rootdir)

If a relative path is specified it will be relative to the rootDir

例（`nuxt.config.js`）:

Example 1:
Prerequisites:
```js
// nuxt.config.js
export default {
  srcDir: 'client/'
}
// package.json
  "script": {
    "dev": "yarn nuxt"
  }
```
works with the following folder structure (note that nuxt.config is listed in the app directory)

上のように指定すると、アプリケーションの構造を次のようにできます:

```bash
-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```

Example 2:

Instead of example 1 you can also move the nuxt.config into your src folder. In this case you only need to specify client as the rootDir and you can leave srcDir empty:

Prerequisites:
```js
// nuxt.config.js
export default {
  srcDir: '' // or just remove it
}
// package.json
  "script": {
    "dev": "yarn nuxt client" // this sets client as the rootDir
  }
```
works with the following folder structure (note that nuxt.config is listed in the client directory)
```bash
-| app/
---| node_modules/
---| package.json
---| client/
------| nuxt.config.js
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```
