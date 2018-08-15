---
title: Host and Port
description: How to edit host and port with Nuxt.js?
---

# How to edit host and port?

You can configure the connection variables in different ways, listed from lowest to highest priority:

## Via a `nuxt` config in the `package.json`:

Inside your `package.json`:

```json
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```


## With HOST and PORT env variables

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

**Note**: for better cross platform development support you can use [cross-env](https://www.npmjs.com/package/cross-env) package.

Installation:

```bash
npm install --save-dev cross-env
```

```js
"scripts": {
  "dev": "cross-env HOST=0.0.0.0 PORT=3333 nuxt"
}
```

## With NUXT_HOST and NUXT_PORT env variables

Similar to HOST and PORT but more specific in case you need those for something else.

```js
"scripts": {
  "dev": "NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

## As direct arguments

```js
"scripts": {
  "dev": "nuxt --hostname myhost --port 3333"
}
```
