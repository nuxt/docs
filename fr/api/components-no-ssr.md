---
title: "API: le composant <no-ssr>"
description: Passe le rendu de composant du côté serveur et affiche un texte à la place.
---

# Le composant &lt;no-ssr&gt;

> Ce composant est utilisé pour retirer la génération des composants côté serveur.

**Props** :
- placeholder : `string`
  - Cette propriété peut être utilisée pour le contenu de la `div` et affiche du texte comme rendu pour la partie générée côté serveur.

```html
<template>
  <div>
    <ssrfrendly-component />
    <no-ssr>
      <not-ssrfrendly />
    </no-ssr>
  </div>
</template>
```

Ce composant est un clone de [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr). Merci [@egoist](https://github.com/egoist) !
