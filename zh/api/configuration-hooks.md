---
title: "API: The hooks Property"
description: hooks是Nuxt模块中通常使用的Nuxt事件的监听器，但也可以在`'Nuxt.config.js'`中使用。
---

# hooks 属性

- 类型: `Object`
> hooks是[Nuxt事件的监听器](/api/internals)，这些事件通常在Nuxt模块中使用，但也可以在nuxt.config.js中使用。[了解更多](/api/internals)

例如 (`nuxt.config.js`):

```js
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(builder.nuxt.options.buildDir, 'extra-file')
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}
```
在内部，hooks遵循使用冒号的命名模式(例如，`build:done`)。为了便于配置，当使用`nuxt.config.js`(如上所示)设置自己的钩子时，可以将它们构造为分层对象。有关它们如何工作的更多详细信息，请参考[Nuxt Internals](/api/internals)。

## hooks 列表

- [Nuxt hooks](https://nuxtjs.org/api/internals-nuxt#hooks)
- [Renderer hooks](https://nuxtjs.org/api/internals-renderer#hooks)
- [ModulesContainer hooks](https://nuxtjs.org/api/internals-module-container#hooks)
- [Builder hooks](https://nuxtjs.org/api/internals-builder#hooks)
- [Generator hooks](https://nuxtjs.org/api/internals-generator#hooks)
