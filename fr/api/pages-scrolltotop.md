---
title: "API: la propriété scrollToTop"
description: La propriété scrollToTop vous permets d'indiquer à nuxt.js de scroller en haut de la page avant de faire le rendu.
---

# La propriété scrollToTop

> La propriété scrollToTop vous permets d'indiquer à nuxt.js de scroller en haut de la page avant de faire le rendu.

- **Type:** `Boolean` (défaut: `false`)

Par défaut, nuxt.js scroll vers le haut de la page quand vous changer de page. Mais dans le cas de routes enfants, nuxt.js reste à sa position actuelle. Si vous désirez indiquer à nuxt.js de scroller en haut de la page lors du rendu de la page enfant, utilisez `scrollToTop: true`:

```html
<template>
  <h1>Mon composant enfant</h1>
</template>

<script>
export default {
  scrollToTop: true
}
</script>
```

Si vous désirez écraser le comportonent par défaut du scroll, regardez l'[option scrollBehavior](/api/configuration-router#scrollBehavior).
