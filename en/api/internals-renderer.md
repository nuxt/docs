---
title: "API : la classe Renderer"
description: La classe `Renderer` de Nuxt
---

# Classe `Renderer`

- Source : **[core/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/renderer.js)**

Cette classe exporte un middleware qui gère et sert tous les rendus côté serveur et les requêtes de ressources.

## Plugins Tapable

Nous pouvons enregistrer des points d'ancrage sur certains évènements du cycle de vie.

```js
nuxt.plugin('renderer', renderer => {
    renderer.plugin('setupMiddleware', app => {
        // ...
    })
})
```

Plugin            | Arguments              | Quand
------------------|------------------------|---------------------------------------------------------------------------------------------------------------------------------
`ready`           | renderer               | Le rendu serveur du middleware et toutes les ressources sont prêtes
`setupMiddleware` | connect instance (app) | Avant que Nuxt ajoute sa pile de middleware. Nous pouvons l'utiliser pour enregistrer des middlewares côté serveur personnalisés
