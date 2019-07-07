---
title: "API: The <nuxt-child> Component (EN)"
description: Display the current page.
---

# Le composant &lt;nuxt-child&gt;

> Ce composant est utilisé pour afficher les composants enfants dans une [route imbriquée](/guide/routing#routes-imbriqu-es).

Exemple :

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Cet arbre de fichier va générer ces routes :

```js
[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Pour afficher le composant `child.vue`, nous avons dû insérer `<nuxt-child/>` à l'intérieur de `pages/parent.vue` :

```html
<template>
  <div>
    <h1>Je suis la vue parente</h1>
    <nuxt-child :foobar="123" />
  </div>
</template>
```

`<nuxt-child/>` accepts `keep-alive` and `keep-alive-props`:

```html
<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- will be converted into something like this -->
<div>
  <keep-alive :exclude="['modal']">
    <router-view />
  </keep-alive>
</div>
```

> Child components can also receive properties like a regular Vue component.

Pour voir un exemple, consultez l'[exemple de routes imbriquées](/examples/nested-routes).

## Named View (EN)

> Introduced with Nuxt v2.4.0

`<nuxt-child/>` accepts `name` prop to render named-view:

```html
<template>
  <div>
    <nuxt-child name="top" />
    <nuxt-child />
  </div>
</template>
```

To see an example, take a look at the [named-views example](/examples/named-views).

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
