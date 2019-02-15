---
title: PostCSS plugins
description: How to add PostCSS plugins?
---

# How to add PostCSS plugins?

Delete postcss.config.js in project directory (if you have it), than in your `nuxt.config.js` file:

```js
export default {
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value 
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```
