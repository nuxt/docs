---
title: JSX
description: Commen utiliser JSX avec Nuxt.js?
---

# Comment utiliser JSX?

Nuxt.js utilise le preset [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) officiel comme configuration de défaut afin de pouvoir utiliser JSX dans vos composants.

Vous pouvez utiliser JSX dans la méthode `render` de vos composants:

```html
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

<p class="Alert Alert--info">Créer un alias `h` pour `createElement` est une convention commune que vous rencontrerez dans l'écosystème Vue mais n'est pas nécessaire pour JSX depuis qu'il [injecte automatiquement](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` dans toutes les méthodes et getter (pas les fonctions/arrow functions) déclarée avec la syntaxe ES2015 supportant JSX; vous pouvez alors laissez tomber le paramètre `h`.</p>

Vous pouvez en savoir plus dans la [section JSX] (https://vuejs.org/v2/guide/render-function.html#JSX) de la documentation Vue.js.
