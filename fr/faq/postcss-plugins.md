---
title: Plugins PostCSS
description: Comment utiliser des plugins PostCSS ?
---

# Comment utiliser des plugins PostCSS ?

### Recommended Method (EN)

If present, rename or delete the `postcss.config.js` in your project directory. Then, in your `nuxt.config.js` file add the following:

```js
export default {
  build: {
    postcss: {
      // Ajoutez le nom du plugin en clé et les arguments en valeur
      // Installez-les avant comme dépendance avec npm ou yarn
      plugins: {
        // désactivez un plugin en passant false comme valeur
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // Changer le paramétrage de postcss-preset-env
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

### Legacy Method (EN)

** Attention: This is deprecated **

Use `postcss.config.js`, for example:

```
const join = require('path').join
const tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [require('tailwindcss')(tailwindJS), require('autoprefixer')]
}
```
