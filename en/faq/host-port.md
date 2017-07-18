---
title: HOST and PORT
description: How to edit HOST and PORT with Nuxt.js?
---

# How to edit HOST and PORT?

You can configure the PORT with 3 different ways:

1. With env variables
```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

2. With the nuxt command parameters:
```js
"scripts": {
  "dev": "nuxt -p 3333 -H 0.0.0.0"
}
```


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