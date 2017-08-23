---
title: Meta Tags dupliqués
description: Meta Tags dupliqués avec Nuxt.js?
---

# Meta Tags dupliqués?

Il s'agit d'une "fonctionnalité" de [vue-meta](https://github.com/declandewet/vue-meta), merci de libre la [documentation des éléments head](/guide/views#html-head).

> Afin d'éviter toute duplication lors de l'utilisation d'un composant enfant, donner un identifiant unique à l'aide de la clef hid, merci [d'en lire plus](https://github.com/declandewet/vue-meta#lists-of-tags).

Pour le meta "description", vous devez ajouter un identifiant unique `hid` afin que vue-meta sache qu'il doit remplacer le tag par défaut.

Votre `nuxt.config.js`:
```js
...head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'keyword 1, keyword 2'},
      { hid: 'description', name: 'description', content: 'This is the generic description.'}
    ],
  },
...
```

Dans votre page individuelle:
```js
export default {
  head () {
    return {
      title: `Page 1 (${this.name}-side)`,
      meta: [
        { hid: 'description', name: 'description', content: "Page 1 description" }
      ],
    }
  }
}
```

Pour apprendre à utiliser la propriété `head` dans vos pages, lire la documentation [HTML head](/guide/views#html-head).
