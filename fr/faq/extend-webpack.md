---
title: Étendre webpack
description: Comment étendre la configuration de webpack dans mon application Nuxt.js ?
---

# Comment étendre la configuration de webpack ? (EN)

Vous pouvez étendre la configuration de webpack via l'option `extend` de votre fichier `nuxt.config.js`. The `extend` option
of the `build` property is a method that accepts two arguments. The first argument is the webpack `config` object exported from nuxt's webpack config. The second parameter is a context object with the following boolean properties: `{ isDev, isClient, isServer, loaders }`.

```js
export default {
  build: {
     extend (config, { isDev, isClient }) {
       // ..
       config.module.rules.push(
          {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'file-loader',
          }
        )
        // Sets webpack's mode to development if `isDev` is true.
        if (isDev) config.mode = 'development'
     }
  }
}
```
The `extend` method gets called twice - Once for the client bundle and the other for the server bundle.
