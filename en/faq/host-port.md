---
title: HOST and PORT
description: How to edit HOST and PORT with Nuxt.js?
---

# How to edit HOST and PORT? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>You can configure the PORT with 3 different ways:</p>

1. With env variables
```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

2. Add better cross platform development support

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

- Via a nuxt config in the `package.json`:

3. Inside your `package.json`:
```js
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
