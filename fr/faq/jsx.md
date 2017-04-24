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

<p class="Alert Alert--info">Créer un alias `h` pour `createElement` est une convention commune que vous rencontrerez dans l'écosystème Vue et est nécessaire pour JSX. Si `h` n'est pas disponible dans le scope, **votre application reportera une erreur**.</p>

Vous pouvez en savoir plus dans la [section JSX] (https://vuejs.org/v2/guide/render-function.html#JSX) de la documentation Vue.js.
