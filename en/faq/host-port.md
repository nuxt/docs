---
title: HOST and PORT
description: How to edit HOST and PORT with Nuxt.js?
---

# How to edit HOST and PORT?

You can configure the PORT with 2 different ways:
- Via a env variables
```json
"scripts": {
    "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```
- Via a nuxt config in the `package.json`:
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
