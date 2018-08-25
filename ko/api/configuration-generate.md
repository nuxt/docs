---
title: "API: generate 프로퍼티"
description: 범용 웹 어플리케이션의 생성을 정적 웹 어플리케이션에 구성합니다.
---

# generate 프로퍼티

- 타입: `Object`

> 범용 웹 어플리케이션의 생성을 정적 웹 어플리케이션에 구성합니다.

런칭할 때의 `nuxt generate` 또는 `nuxt.generate()`의 호출로 config 파일에 정의된 `generate` 프로퍼티를 nuxt.js가 사용합니다.

## dir

- 타입: `String`
- 기본값: `'dist'`

`nuxt generate`에 의해 폴더명이 만들어집니다.

## fallback <!-- TODO: translate -->

- Type: `String` or `Boolean`
- Default: `'200.html'`

The path to the SPA fallback. This file can be used when doing deploys of generated sites to static hosting. It falls back to `mode: 'spa'` when a route isn't generated.

## interval

- Type: `Number`
- Default: `0`

Interval between two render cycles to avoid flooding a potential API with API calls from the web application.

## minify

- 타입: `Object`
- 기본값:

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

사용자는 nuxt.js의 generate 명령어가 실행되는 동안 만들어질 minify html files에 대한 기본 설정을 [html-minifier](https://github.com/kangax/html-minifier)으로 바꿀 수 있습니다.


## 경로

- 타입: `Array`

[동적 경로](/guide/routing#dynamic-routes)는 generate 명령어가 무시됩니다.

예제:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

nuxt.js는 `/`경로만 생성합니다.

만약 nuxt.js로 동적 params를 사용하는 경로하려면, 동적 경로를 배열로 설정해줘야 합니다.

`nuxt.config.js`내부의 `/users/:id`를 위해 경로를 추가합니다.:
```js
module.exports = {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

`nuxt generate`를 실행:
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

훌륭합니다. 그런데 만약 사용자가 **동적 params** 를 사용한다면?
1. `Promise`를 반환하는 `함수`를 사용합니다.
2. `콜백`을 사용하는 `함수`를 사용합니다.

### Promise를 반환하는 함수

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

### 콜백을 사용하는 함수

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
