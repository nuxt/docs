---
title: "API: nuxt.renderAndGetWindow(url, options)"
description: Get the window from a given url of a nuxt.js application.
---

# nuxt.renderAndGetWindow(url, options = {}) (En)

- Type: `Function`
- Argument: `String`
  1. `String`: url to render
  2. *Optional*, `Object`: options
    - virtualConsole: `Boolean` (default: `true`)
- Returns: `Promise`
  - Returns: `window`

> Get the window from a given url of a nuxt.js application.

<p class="Alert Alert--info">This method is made for [test purposes](guide/development-tools#end-to-end-testing).</p>

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>To use this function, you have to install `jsdom`:</p>
```bash
npm install --save-dev jsdom
```

Example:
```js
const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

nuxt.renderAndGetWindow('http://localhost:3000')
.then((window) => {
  // Display the head <title>
  console.log(window.document.title)
})
```
