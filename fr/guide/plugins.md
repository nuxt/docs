---
title: Plugins
description: Nuxt.js vous permet de définir les plugins JavaScript à exécuter avant d'instancier l'application Vue.js racine. Cela est particulièrement pratique quand vous utilisez vos propres bibliothèques ou modules externes.
---

> Nuxt.js vous permet de définir les plugins JavaScript à exécuter avant d'instancier l'application Vue.js racine. Cela est particulièrement pratique quand vous utilisez vos propres bibliothèques ou modules externes.

<div class="Alert">Il est important de savoir que, dans le [cycle de vie d'une instance de Vue](https://fr.vuejs.org/v2/guide/instance.html#Diagramme-du-cycle-de-vie), les hooks `beforeCreate` et `created` sont appelés **à la fois du côté client et du côté serveur**. Tous les autres *hooks* ne sont appelés que depuis le client.</div>

## Modules externes

Nous souhaitons utiliser des packages / modules externes dans notre application, un excellent exemple est [axios](https://github.com/mzabriskie/axios) pour les requêtes HTTP depuis le serveur et le client.

Nous l'installons via npm :

```bash
npm install --save axios
```

Puis nous pouvons l'utiliser directement dans nos pages :

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios'

export default {
  async data ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
```

Mais il y a **un problème**, si nous importons axios dans une autre page, il sera à nouveau inclus dans le paquetage de la page. Nous voulons inclure `axios` une seule fois dans notre application, pour cela, nous utilisons la clé `build.vendor` dans notre `nuxt.config.js` :

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

Je peux ensuite importer `axios` partout sans avoir à m'inquiéter de l'importer plusieurs fois et de rendre le paquetage plus lourd.

## Plugins Vue

Si nous voulons utiliser [vue-notifications](https://github.com/se-panfilov/vue-notifications) pour afficher des notifications dans notre application, nous devons configurer le plugin avant de lancer l'application.

Dans `plugins/vue-notifications.js` :

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Puis nous ajoutons le fichier dans l'attribut `plugins` de `nuxt.config.js` :

```js
module.exports = {
  plugins: ['~plugins/vue-notifications']
}
```

Pour en savoir plus sur l'attribut `plugins`, consultez [La propriété `plugins`](/api/configuration-plugins) de l'API.

Acutellement, `vue-notifications` sera inclus dans le paquetage de l'application. Mais comme il s'agit d'une bibliothèque, nous voulons l'inclure dans le paquetage `vendor` pour une meilleure mise en cache.

Nous pouvons mettre à jour `nuxt.config.js` pour ajouter `vue-notifications` dans le bundle `vendor` :

```js
module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: ['~/plugins/vue-notifications']
}
```

## Injection dans $root et context

Plusieurs plugins ont besoin d'être injectés à la racine de l'application pour être utilisés, comme [vue-18n](https://github.com/kazupon/vue-i18n). Avec Nuxt.js, vous pouvez utilisez `app` qui est disponible dans le `context` quand vous exportez une méthode :

`plugins/i18n.js`:

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ store }, inject) => {
  // Mettre l'instance `i18n` dans `app`
  // De cette manière nous pouvons l'utiliser comme middleware et `asyncData` / `fetch` pour les pages
  app.i18n = new VueI18n({
    /* `VueI18n` options... */
  })
}
```

`nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['vue-i18n']
  },
  plugins: ['~/plugins/i18n.js']
}
```

Pour voir comment utiliser ce plugin, consultez cet [exemple i18n](/examples/i18n).

## Côté client uniquement

Certains plugins fonctionnent **uniquement dans un navigateur**. Vous pouvez utiliser l'option `ssr: false` dans `plugins` pour exécuter le fichier uniquement côté client.

Exemple :

`nuxt.config.js`:

```js
module.exports = {
  plugins: [
    { src: '~/plugins/vue-notifications', ssr: false }
  ]
}
```

`plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Dans le cas où vous devez importer certaines bibliothèques uniquement pour le serveur, vous pouvez utiliser la variable `process.server` définie sur `true` lorsque le serveur web crée le fichier `server.bundle.js`.

Si vous avez besoin également de savoir si vous êtes dans une application générée (via `nuxt generate`), vous pouvez vérifier la propriété `process.static` mise à `true` pendant la génération et après. Pour connaitre dans quel état est une page qui est en train d'être rendue par `nuxt generate` avant d'être sauvée, vous pouvez utilisez `process.static && process.server`.
