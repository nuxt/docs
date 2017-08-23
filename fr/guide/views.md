---
title: Vues
description: La section Vues décrit tout ce dont vous avez besoin pour configurer les données et les vues pour une route spécifique dans votre application Nuxt.js. (Document, Layouts, Pages et HTML Head)
---

> La section Vues décrit tout ce dont vous avez besoin pour configurer les données et les vues pour une route spécifique dans votre application Nuxt.js. (Document, Layouts, Pages et HTML Head)

![nuxt-views-schema](/nuxt-views-schema.png)

## Document

> Vous pouvez personnaliser le document principal avec nuxt.js

Pour étendre le modèle html, créez un fichier `app.html` à la racine de votre projet.

Le modèle par défaut est le suivant:

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

Un exemple pour ajouter des classes CSS conditionnelles pour IE:

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## Mise en page

Nuxt.js vous permet d'étendre la mise en page principale ou de créer des mises en page personnalisées en les ajoutant dans le répertoire `layouts`.

### Mise en page par défaut

Vous pouvez étendre la mise en page principale en ajoutant un fichier `layouts/default.vue`.

*Assurez-vous d'ajouter le composant `<nuxt/>` lors de la création d'une mise en page afin d'afficher le composant de la page.*

Le code source de mise en page par défaut est:
```html
<template>
  <nuxt/>
</template>
```

### Page d'erreur

Vous pouvez personnaliser la page d'erreur en ajoutant un fichier `layouts/error.vue`.

Cette mise en page est spéciale car vous ne devez pas inclure `<nuxt />` dans son modèle. Vous devez voir cette mise en page en tant que composant affiché lorsqu'une erreur se produit (404, 500, etc.).

Le code source de la page d'erreur par défaut est [disponible sur GitHub](https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue).

Exemple d'une page d'erreur personalisée à l'aide de `layouts/error.vue`:
```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page non trouvée</h1>
    <h1 v-else>Une erreur s'est produite</h1>
    <nuxt-link to="/">Accueil</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // vous pouvez définir une mise en page personalisée pour la page d'erreur
}
</script>
```

### Mise en page personalisée

Chaque fichier (*premier niveau*) dans le répertoire `layouts` créera une mise en page personnalisée accessible via la propriété `layout` dans le composant de la page.

*Assurez-vous d'ajouter le composant `<nuxt/>` lors de la création d'une mise en page afin d'afficher le composant de la page.*

Exemple avec `layouts/blog.vue`:
```html
<template>
  <div>
    <div>Ma navigation de blog est ici</div>
    <nuxt/>
  </div>
</template>
```

Puis dans `pages/posts.vue`, vous pouvez spécifier à Nuxt.js d'utiliser votre mise en page personalisée:
```html
<script>
export default {
  layout: 'blog'
}
</script>
```

Plus d'informations à propos de la propriété des mises en pages: [API Pages layout](/api/pages-layout)

Regardez la [vidéo de démonstration](https://www.youtube.com/watch?v=YOKnSTp7d38) pour la voir en action (EN).

## Pages

Chaque composant Page est un composant Vue, mais Nuxt.js ajoute des clés spéciales pour rendre le développement de votre application universelle la plus simple possible.

```html
<template>
  <h1 class="red">Hello {{ nom }}!</h1>
</template>

<script>
export default {
  asyncData (context) {
    // appellé avant le "loading" du composant
    return { nom: 'World' }
  },
  fetch () {
    // La méthode "fetch" est utilisé pour peupler le "store" avant d'effectuer le rendu de la page
  },
  head () {
    // Définit les meta tags pour cette page
  },
  // et plus de fonctionnalités à découvrir
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```


| Attribut | Description |
|-----------|-------------|
| asyncData | L'attribut le plus important. Il peut être asynchrone et reçoit le contexte comme argument, lisez la [documentation sur asyncData](/guide/async-data) pour savoir comment il fonctionne. |
| fetch | Utilisé pour peupler le "store" avant de faire le rendu de la page, équivalent à la méthode "data" sauf qu'il ne peuple pas le composant "data". Voir [API Pages fetch](/api/pages-fetch). |
| head | Définissez des Meta tags spécifiques pour la page en cours, voir [API Pages head](/api/pages-head). |
| layout | Spécifie une mise en page existantes dans le répertoire `layouts`, voir [API Pages layouts](/api/pages-layout). |
| transition | Défini une transition spécifique pour une page, voir [API Pages transition](/api/pages-transition). |
| scrollToTop | Booléen, par défaut: `false`. Indiquez si vous souhaitez que la position se déplace vers le haut avant d'afficher la page, est utilisé pour les [routes imbriquées](/guide/routing#nested-routes). |
| validate | Fonction de validation pour une [route dynamique](/guide/routing#dynamic-routes). |
| middleware | Définissez un middleware pour cette page, ce middleware sera exécuté avant d'effectuer le rendu de la page, voir [routes middleware](/guide/routing#middleware). |

Plus d'informations à propos de l'utilisation des attributs des pages: [API Pages](/api)

## HTML Head

Nuxt.js utilise [vue-meta](https://github.com/declandewet/vue-meta) pour mettre à jour les `headers` et les `html attributes` de votre application.

Nuxt.js configure `vue-meta` avec les options suivantes:
```js
{
  keyName: 'head', // le nom de l'option où vue-meta va chercher les infos.
  attribute: 'data-n-head', // l'attribut que vue-meta ajoute aux tags observés
  ssrAttribute: 'data-n-head-ssr', // le nom de l'attribut qui permet à vue-meta de savoir que la méta-information a déjà été générée par le serveur
  tagIDKeyName: 'hid' // Le nom de la propriété que vue-meta utilise pour déterminer s'il faut écraser ou ajouter un tag
}
```

### Meta tags par défaut

Nuxt.js vous permet de définir tous les meta par défaut de votre application dans `nuxt.config.js`, en utilisant la propriété `head`:

Exemple d'un viewport spécifique et d'une police Google:
```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

Pour connaitre la liste des options que vous pouvez donner à `head`, jeter un oeil à la [documentation vue-meta](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).

Plus d'informations à propos de la méthode head: [API Configuration head](/api/configuration-head)

### Meta tags personalisé pour une page

Plus d'informations à propos de la méthode head: [API Pages head](/api/pages-head)

<p class="Alert">Afin d'éviter toutes duplications lors de l'utilisation d'un composant enfant, donnez un identifiant unique à l'aide de l'attribut `hid`; [en lire plus à ce propos.](https://github.com/declandewet/vue-meta#lists-of-tags)</p>
