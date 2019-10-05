---
title: Komponenten cachen
description: Komponenten cachen
---

# Vue-Komponenten cachen

> Auch wenn Vues serverseitiges Rendering (SSR) ziemlich schnell ist, kann es - aufgrund der Erstellung von Komponenten und virtuellen DOM-Nodes - nicht die Leistung eines rein String-basierten Templatings erreichen. In Fällen, in denen die Leistung des SSR entscheidend ist, kann der Einsatz von Caching die Antwortzeiten verbessern und die Serverlast verringern.

To avoid boilerplate, use [Component Cache module](https://github.com/nuxt-community/modules/tree/master/packages/component-cache) for Nuxt.js. This module uses vue-server-renderer to add LRU cache support for Vue components.

## Verwendung

- Füge mithilfe von yarn oder npm das Paket `@nuxtjs/component-cache` dem Projekt hinzu
- Erweitere wie folgt den Abschnitt `modules` der `nuxt.config.js` um `@nuxtjs/component-cache`

```js
{
  modules: [
    // Einfache Nutzung
    '@nuxtjs/component-cache',

    // Mit Optionen
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
  ]
}
```

Weitere Informationen dazu findest du [in der Dokumentation von Vue.js](http://ssr.vuejs.org/en/caching.html#component-level-caching).

## Merke, dass

- Cache-kompatible Komponenten **eine eindeutige Zuweisung von `name` besitzen müssen**.
- ***KEINE*** Komponenten gecachet werden sollten, die
    - has child components that may rely on global state.
    - has child components that produces side effects on the render `context`.
