---
title: Plugins
description: Nuxt.js vous permet de définir les plugins js à exécuter avant d'instancier l'application vue.js racine, il peut s'agir d'utiliser votre propre bibliothèque ou des modules externes.
---

> Nuxt.js vous permet de définir les plugins js à exécuter avant d'instancier l'application vue.js racine, il peut s'agir d'utiliser votre propre bibliothèque ou des modules externes.

<div class="Alert">Il est important de savoir que, dans le [cycle de vie d'une instance de Vue](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), les *hooks* `beforeCreate` et` created` sont appelés **à la fois côté client et du côté serveur**. Tous les autres *hooks* ne sont appelés que du client.</div>

## Modules externes

Nous souhaitons utiliser des packages/modules externes dans notre application, un excellent exemple est [axios](https://github.com/mzabriskie/axios) pour les requêtes HTTP pour le serveur et le client.

Nous l'installons via npm:

```bash
npm install --save axios
```

Puis, nous pouvons l'utiliser directement dans nos pages:

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

Mais il y a **un problème**, si nous importons axios dans une autre page, il sera à nouveau inclus dans le bundle de la page. Nous voulons inclure `axios` une seule fois dans notre application, pour cela, nous utilisons la clé `build.vendor` dans notre `nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

Ensuite, je peux importer `axios` partout sans avoir à m'inquiéter de l'importer plusieurs fois et de rendre le bundle plus lourd.

## Plugins Vue

Si nous voulons utiliser [vue-notifications](https://github.com/se-panfilov/vue-notifications) pour afficher des notifications dans notre application, nous devons configurer le plugin avant de lancer l'application.

Dans `plugins/vue-notifications.js`:
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Puis, nous ajoutons le fichier dans l'attribut `plugins` de `nuxt.config.js`:
```js
module.exports = {
  plugins: ['~plugins/vue-notifications']
}
```

Pour en savoir plus sur l'attribut `plugins`, voir [plugins api](/api/configuration-plugins).

Acutellement, `vue-notifications` sera inclu dans le bundle de l'application; mais comme il s'agit d'une librairie, nous voulons l'inclure dans le bundle `vendor` pour une meilleure mise en cache.

Nous pouvons mettre à jour `nuxt.config.js` pour ajouter `vue-notifications` dans le bundle `vendor`:
```js
module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: ['~plugins/vue-notifications']
}
```

## Côté client uniquement

Certains plugins fonctionnent **uniquement côté navigateur**. Vous pouvez utiliser l'option `ssr: false` dans `plugins` pour exécuter le fichier uniquement côté client.

Exemple:

`nuxt.config.js`:
```js
module.exports = {
  plugins: [
    { src: '~plugins/vue-notifications', ssr: false }
  ]
}
```

`plugins/vue-notifications.js`:
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Dans le cas où vous devez importer certaines librairies uniquement pour le serveur, vous pouvez utiliser la variable `process.server` définie sur `true` lorsque le serveur web crée le fichier `server.bundle.js`.
