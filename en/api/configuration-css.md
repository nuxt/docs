---
title: "API: The css Property"
description: Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every pages).
---

# The css Property

> Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every pages).

In case you want to use ```sass``` make sure that you have installed ```node-sass``` and ```sass-loader``` packages. If you didn't  just

```sh
npm install --save-dev node-sass sass-loader
```

- Type: `Array`
 - Items: `String` or `Object`

If the item is an object, the properties are:
- src: `String` (path of the file)
- lang: `String` ([pre-processor used](/faq/pre-processors))

In `nuxt.config.js`, add the CSS resources:

```js
module.exports = {
  css: [
    // Load a node.js module
    'hover.css/css/hover-min.css',
    // node.js module but we specify the pre-processor
    { src: 'bulma', lang: 'sass' },
    // Css file in the project
    '~assets/css/main.css',
    // Sass file in the project
    { src: '~assets/css/main.scss', lang: 'scss' } // scss instead of sass
  ]
}
```

## Dependencies
For certain files you need extra dependencies.  
[If you use `sass`/`scss` make sure to install these via npm](https://github.com/nuxt/nuxt.js/issues/1003#issuecomment-312304831):
- node-sass
- sass-loader
