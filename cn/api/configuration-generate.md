---
title: "API: generate 属性配置"
description: 配置 Nuxt.js 应用生成静态站点的具体方式。
---

# generate 属性配置

- 类型： `Object`

> 配置 Nuxt.js 应用生成静态站点的具体方式。

当运行 `nuxt generate` 命令或在编码中调用 `nuxt.generate()` 时，Nuxt.js 会使用 `generate` 属性的配置。

## routeParams

- 类型： `Object`
  - 键类型： `String` (路由路径)
  - 值类型： `Array` 或 `Function`

当使用 [动态路由](/guide/routing#动态路由) 时，你需要为每个动态的路由定义至少一个对应的参数映射。

例如：

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Nuxt.js 会依据以上目录结构生成的路由为： `/` 和 `/users/:id`。

如果你尝试运行 `nuxt generate`， 终端控制台会抛出以下错误异常：

```bash
Could not generate the dynamic route /users/:id, please add the mapping params in nuxt.config.js (generate.routeParams).
```

这时候我们可以在 `nuxt.config.js` 中为 `/users/:id` 路由配置参数的值：
```js
module.exports = {
  generate: {
    routeParams: {
      '/users/:id': [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ]
    }
  }
}
```

当我们再次运行 `nuxt generate` 命令时就不会有错误异常了：
```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

棒极了，但是如果路由**动态参数**的值是动态的而不是固定的，应该怎么做呢？
1. 使用一个返回 `Promise` 对象类型 的 `函数`。
2. 使用一个参数是 `callback(err, params)` 的 `函数`。

### 返回一个 Promise 对象

`nuxt.config.js`：
```js
import axios from 'axios'

module.exports = {
  generate: {
    routeParams: {
      '/users/:id': function () {
        return axios.get('https://my-api/users')
        .then((res) => {
          return res.data.map((user) => {
            return { id: user.id }
          })
        })
      }
    }
  }
}
```

### 参数是一个 Node 风格的回调函数

`nuxt.config.js`：
```js
import axios from 'axios'

module.exports = {
  generate: {
    routeParams: {
      '/users/:id': function (callback) {
        axios.get('https://my-api/users')
        .then((res) => {
          var params = res.data.map((user) => {
            return { id: user.id }
          })
          callback(null, params)
        })
        .catch(callback)
      }
    }
  }
}
```
