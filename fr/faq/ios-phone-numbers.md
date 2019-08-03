---
title: iOS et numéros de téléphone
description: Safari sur iOS change les numéros de téléphone en liens qui peuvent causer des problèmes de rendu
---

# iOS et numéros de téléphone

Plusieurs version mobile de Safari vont automatiquement transformer les numéros de téléphone en lien. Cela va lever un avertissement `NodeMismatch` cal le contenu SSR ne concorde plus avec le contenu du site. Cela peut rendre vos applications non utilisables sur ces versions de Safari.

Quand vous incluez des numéros de téléphones dans vos pages Nuxt, vous avez deux options.

## Utiliser une balise meta pour stopper la transformation

```html
<meta name="format-detection" content="telephone=no">
```

## Placer vos numéros de téléphone dans des liens

```html
<!-- Exemple de numéro de téléphone : +7 (982) 536-50-77 -->

<template>
  <a href="tel: +7 (982) 536-50-77">+7 (982) 536-50-77</a>
</template>

```
