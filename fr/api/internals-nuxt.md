---
title: "API : la classe Nuxt"
description: La classe cœur Nuxt
---

# La classe Nuxt

- Source : **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/nuxt.js)**

C'est le conteneur cœur qui permet à tous les modules et classes de communiquer les uns avec les autres. Tous les modules ont accès à l'instance de Nuxt en utilisant `this.nuxt`.

## Points d'ancrage

Nous pouvons enregistrer des points d'ancrage sur certains évènements du cycle de vie.

```js
nuxt.hook('ready', async nuxt => {
    // Votre code personnalisé ici
})
```

Plugin   | Arguments              | Quand
---------|------------------------|-----------------------------------------------------------------------------------------
`ready`  | nuxt                   | Après l'initialisation de tous les modules et avant l'initialisation du moteur de rendu
`error`  | error args             | Une erreur non gérée par un des modules Nuxt attrapée
`close`  | -                      | L'instance de Nuxt est gracieusement fermée
`listen` | ({server, host, port}) | Les **mécanismes** serveur de Nuxt commencent à écouter. (Avec `nuxt start` ou `nuxt dev`)
