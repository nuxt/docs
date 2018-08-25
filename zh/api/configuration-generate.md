---
title: 'API: generate 属性配置'
description: 配置 Nuxt.js 应用生成静态站点的具体方式。
---

# generate 属性配置

- 类型： `Object`

> 配置 Nuxt.js 应用生成静态站点的具体方式。

当运行 `nuxt generate` 命令或在编码中调用 `nuxt.generate()` 时，Nuxt.js 会使用 `generate` 属性的配置。

## dir

- 类型： 'String'
- 默认值： `'dist'`

`nuxt generate` 生成的目录名称。

<!-- TODO: translate -->
## fallback

- Type: `String` or `Boolean`
- Default: `'200.html'`

The path to the SPA fallback. This file can be used when doing deploys of generated sites to static hosting. It falls back to `mode: 'spa'` when a route isn't generated.

## interval

- Type: `Number`
- Default: `0`

Interval between two render cycles to avoid flooding a potential API with API calls from the web application.

## minify

- 类型: `Object`
- 默认值:

```js
minify: {
  collapseBooleanAttributes: true,
  collapseWhitespace: false,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortAttributes: true,
  sortClassName: false,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

Nuxt.js 在生成静态文件时使用 [html-minifier](https://github.com/kangax/html-minifier) 对 html 文件进行压缩，你可以修改上述的默认配置来调整压缩的行为。

## routes

- 类型： `Array`

在 Nuxt.js 执行 `generate` 命令时，[动态路由](/guide/routing#动态路由) 会被忽略。

例如：

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

上面的目录结构，Nuxt.js 只会生成路由 `/` 对应的静态文件。（译者注：因为 `/users/:id` 是动态路由）
如果想让 Nuxt.js 为动态路由也生成静态文件，你需要指定动态路由参数的值，并配置到 `routes` 数组中去。

例如，我们可以在 `nuxt.config.js` 中为 `/users/:id` 路由配置如下：
```js
module.exports = {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

当我们运行 `nuxt generate` 命令时：
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
2. 使用一个回调是 `callback(err, params)` 的 `函数`。

### 返回一个 Promise 对象的函数

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios
        .get('https://my-api/users')
        .then(res => res.data.map(user => '/users/' + user.id))
    }
  }
```

### 参数是一个 Node 风格的回调函数

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
  }
}
```

<!-- TODO: translate onwards -->
### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
    }
    }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```

Now we can access the `payload` from `/users/_id.vue` like so:

```js
asyncData: async ({ params, error, payload }) =>
  payload
  ? { user: payload }
  : { user: await backend.fetchUser(params.id) }
```

## subFolders

- Type: `Boolean`
- Default: `true`

By default, running `nuxt generate` will create a directory for each route & serve an `index.html` file.

Example:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

When set to false, HTML files are generated according to the route path:

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
  }
}
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
  }
}
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
}
}
```

Now we can access the `payload` from `/users/_id.vue` like so:

```js
asyncData: async ({ params, error, payload }) =>
  payload
  ? { user: payload }
  : { user: await backend.fetchUser(params.id) }
```

## subFolders

- Type: `Boolean`
- Default: `true`

By default, running `nuxt generate` will create a directory for each route & serve an `index.html` file.

Example:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

When set to false, HTML files are generated according to the route path:

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
}
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
  }
}
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
    }
    }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```

Now we can access the `payload` from `/users/_id.vue` like so:

```js
asyncData: async ({ params, error, payload }) =>
  payload
  ? { user: payload }
  : { user: await backend.fetchUser(params.id) }
```

## subFolders

- Type: `Boolean`
- Default: `true`

By default, running `nuxt generate` will create a directory for each route & serve an `index.html` file.

Example:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

When set to false, HTML files are generated according to the route path:

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
  }
}
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
        })
      .catch(callback)
  }
}
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
}
}
```

Now we can access the `payload` from `/users/_id.vue` like so:

```js
asyncData: async ({ params, error, payload }) =>
  payload
  ? { user: payload }
  : { user: await backend.fetchUser(params.id) }
```

## subFolders

- Type: `Boolean`
- Default: `true`

By default, running `nuxt generate` will create a directory for each route & serve an `index.html` file.

Example:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

When set to false, HTML files are generated according to the route path:

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })      
      .catch(callback)
  }
}
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
        callback(null, routes)
      })
      .catch(callback)
    }
  }
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```
    routes: callback =>
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => '/users/' + user.id)
          callback(null, routes)
        })
        .catch(callback)
  }
}
```

### Speeding up dynamic route generation with `payload`

In the example above, we're using the `user.id` from the server to generate the routes but tossing out the rest of the data. Typically, we need to fetch it again from inside the `/users/_id.vue`. While we can do that, we'll probably need to set the `generate.interval` to something like `100` in order not to flood the server with calls. Because this will increase the run time of the generate script, it would be preferable to pass along the entire `user` object to the context in `_id.vue`. We do that by modifying the code above to this:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes: () =>
      axios.get('https://my-api/users').then(res =>
        res.data.map(user => ({
          route: '/users/' + user.id,
          payload: user
        }))
      )
  }
}
```

Now we can access the `payload` from `/users/_id.vue` like so:

```js
asyncData: async ({ params, error, payload }) =>
  payload
  ? { user: payload }
  : { user: await backend.fetchUser(params.id) }
```

## subFolders

- Type: `Boolean`
- Default: `true`

By default, running `nuxt generate` will create a directory for each route & serve an `index.html` file.

Example:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

When set to false, HTML files are generated according to the route path:

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```

_Note: this option could be useful using [Netlify](https://netlify.com) or any static hosting using HTML fallbacks._

## concurrency

- Type: `Number`
- Default: `500`

The generation of routes are concurrent, `generate.concurrency` specifies the amount of routes that run in one thread.
