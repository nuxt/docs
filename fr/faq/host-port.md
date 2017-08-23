---
title: HOST et PORT
description: Comment changer HOST et PORT avec Nuxt.js?
---

# Comment changer HOST et PORT?

Vous pouvez configurer le PORT de deux façons:
- Via une variable d'environnement
```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```
- Via la configuration nuxt dans `package.json`:
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
