---
title: "API: nuxt.renderAndGetWindow(url, options)"
description: Get the window from a given url of a nuxt.js application.
---

# nuxt.renderAndGetWindow(url, options = {})

- Type: `Function`
- Argument: `String`
  1. `String`: url to render
  2. *Optional*, `Object`: options
    - virtualConsole: `Boolean` (default: `true`)
- Returns: `Promise`
  - Returns: `window`

> Get the window from a given url of a nuxt.js application.

<p class="Alert Alert--info">This method is made for [test purposes](guide/development-tools#end-to-end-testing).</p>

To use this function, you have to install `jsdom`:
```bash
npm install --save-dev jsdom
```

Example:
```js
const Nuxt = require('nuxt')
const nuxt = new Nuxt()

nuxt.renderAndGetWindow('http://localhost:3000')
.then((window) => {
  // Display the head <title>
  console.log(window.document.title)
})
```
