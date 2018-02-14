---
title: "API: The env Property"
description: Share environment variables between client and server.
---

# The env Property

- Type: `Object`

> Nuxt.js lets you create environment variables that will be shared for the client and server-side.

Example (`nuxt.config.js`):

```js
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

This lets me create a `baseUrl` property that will be equal to the `BASE_URL` environment variable if defined, otherwise, equal to `http://localhost:3000`.

Then, I can access my `baseUrl` variable with 2 ways:

1. Via `process.env.baseUrl`
2. Via `context.env.baseUrl`, see [context api](/api/context)

You can use the `env` property for giving public token for example.

For the example above, we can use it to configure [axios](https://github.com/mzabriskie/axios).

`plugins/axios.js`:
```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Then, in your pages, you can import axios like this: `import axios from '~/plugins/axios'`

## process.env == {}
Note that nuxt uses webpack's `definePlugin` to define the environmental variable. This means that, the actual `process` or `process.env` from node is not available and is not defined. Each of the env properties defined in nuxt.config.js is individually mapped to process.env.xxxx and converted during compilation. 

Meaning, `console.log(process.env)` will output `{}` but `console.log(process.env.you_var)` will still output your value. When webpack compiles your code, it replaces all instances of `process.env.your_var` to the value you've set it to. ie: `env.test = 'testing123'`. If you use `process.env.test` in your code somewhere, it is actually translated to 'testing123'.

before
```
if (process.env.test == 'testing123')
```

after
```
if ('testing123' == 'testing123')
```


