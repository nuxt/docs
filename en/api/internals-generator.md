---
title: "API : la classe Generator"
description: La classe `Generator` de Nuxt
---

# La classe Generator

- Source : **[builder/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/generator.js)**

## Plugins Tapable

Nous pouvons enregistrer des points d'ancrage sur certains évènements du cycle de vie.

```js
nuxt.plugin('generator', generator => {
    generator.plugin('generate', ({routes}) => {
        // ...
    }))
})
```

Plugin           | Arguments                   | Quand
-----------------|-----------------------------|-------------------------------------------------------------------------------------------------
`generateRoutes` | {generator, generateRoutes} | Après la résolution des routes pour génération afin de faire des changements personnalisés
`generate`       | {generator, routes}         | Avant le démarrage de la génération des routes. Les routes sont décorées avec des charges utiles
