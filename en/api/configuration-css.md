---
title: Configuration CSS
---

# Css

> Nuxt.js let you define the CSS files/modules/libraries you want to set as globals (included in every pages).

In `nuxt.config.js` file, add the CSS resources:

```js
const { resolve } = require('path')

module.exports = {
  css: [
    // Load a node.js module
    'hover.css/css/hover-min.css',
    // node.js module but we specify the lang
    { src: 'bulma', lang: 'sass' },
    // Css file in the project
    // It is important to give an absolute path
    resolve(__dirname, 'assets/css/main.css')
  ]
}
```

<p class="Alert">**In production**, all CSS will be minified and extracted in a file named `styles.css` and added in the `<head>` of the page.</p>
