---
title: "API: le composant <no-ssr>"
description: Passe le rendu de composant du côté serveur et affiche un texte à la place.
---

# Le composant &lt;no-ssr&gt;

> Ce composant est utilisé pour retirer la génération des composants côté serveur.

**Props** :
- placeholder : `string`
  - Utilise un texte comme valeur par défaut jusqu'à ce qu'un `<no-ssr />` soit monté sur côté client.

```html
<template>
  <div>
    <sidebar />
    <no-ssr placeholder="Chargement...">
      <!-- ce composant sera uniquement rendu côté client -->
      <comments />
    </no-ssr>
  </div>
</template>
```

**Slots**:

- placeholder:
  - Utilise un texte comme valeur par défaut jusqu'à ce qu'un `<no-ssr />` soit monté sur côté client.

 ```html
<template>
  <div>
    <sidebar />
    <no-ssr>
      <!-- ce composant sera uniquement rendu côté client -->
      <comments />

      <!-- indicateur de chargement -->
      <comments-placeholder slot="placeholder" />
    </no-ssr>
  </div>
</template>
```

> Notez que `<no-ssr />` ne peut contenir qu'UN élément / composant enfant.

Ce composant est un clone de [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr). Merci [@egoist](https://github.com/egoist) !
