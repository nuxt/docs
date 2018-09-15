---
title: Vues
description: La section des vues décrit tout ce dont vous avez besoin pour configurer les données et les vues pour une route spécifique dans votre application Nuxt.js (document, mises en page, pages et entête HTML).
---

> La section des vues décrit tout ce dont vous avez besoin pour configurer les données et les vues pour une route spécifique dans votre application Nuxt.js (document, mises en page, pages et entête HTML).

![nuxt-views-schema](/nuxt-views-schema.png)

## Document

> Vous pouvez personnaliser le document principal avec Nuxt.js.

Pour étendre le modèle HTML, créez un fichier `app.html` à la racine de votre projet.

Le modèle par défaut est le suivant :

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

Un exemple pour ajouter des classes CSS conditionnelles pour IE :

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="fr-FR" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## Mises en page

Nuxt.js vous permet d'étendre la mise en page principale ou de créer des mises en page personnalisées en les ajoutant dans le répertoire `layouts`.

### Mise en page par défaut

Vous pouvez étendre la mise en page principale en ajoutant un fichier `layouts/default.vue`.

*Assurez-vous d'ajouter le composant `<nuxt/>` lors de la création d'une mise en page afin d'afficher le composant de la page.*

Le code source de mise en page par défaut est :

```html
<template>
  <nuxt/>
</template>
```

### Page d'erreur

Vous pouvez personnaliser la page d'erreur en ajoutant un fichier `layouts/error.vue`.

Cette mise en page est spéciale car vous ne devez pas inclure `<nuxt />` dans son modèle. Vous devez voir cette mise en page en tant que composant affiché lorsqu'une erreur se produit (404, 500, etc.).

Le code source de la page d'erreur par défaut est [disponible sur GitHub](https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue).

Exemple d'une page d'erreur personnalisée à l'aide de `layouts/error.vue`:

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
  layout: 'blog' // vous pouvez définir une mise en page personnalisée pour la page d'erreur
}
</script>
```

### Mise en page personnalisée

Chaque fichier (*premier niveau*) dans le répertoire `layouts` créera une mise en page personnalisée accessible via la propriété `layout` dans le composant de la page.

*Assurez-vous d'ajouter le composant `<nuxt/>` lors de la création d'une mise en page afin d'afficher le composant de la page.*

Exemple avec `layouts/blog.vue` :

```html
<template>
  <div>
    <div>Ma navigation de blog est ici</div>
    <nuxt/>
  </div>
</template>
```

Puis dans `pages/posts.vue`, vous pouvez spécifier à Nuxt.js d'utiliser votre mise en page personnalisée :

```html
<script>
export default {
  layout: 'blog'
}
</script>
```

Pour plus d'informations, consultez la configuration de l'API à propos de [La propriété `layout`](/api/pages-layout).

Regardez la [vidéo de démonstration](https://www.youtube.com/watch?v=YOKnSTp7d38) pour la voir en action (EN).

## Pages

Chaque composant de page est un composant Vue, mais Nuxt.js ajoute des clés spéciales pour rendre le développement de votre application universelle le plus simple possible.

```html
<template>
  <h1 class="red">Hello {{ name }} !</h1>
</template>

<script>
export default {
  asyncData (context) {
    // appelé avant le chargement du composant
    return { name: 'World' }
  },
  fetch () {
    // La méthode `fetch` est utilisée pour peupler le store avant d'effectuer le rendu de la page
  },
  head () {
    // Définit les balises meta pour cette page
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

| Attribut      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `asyncData`   | L'attribut le plus important. Il peut être asynchrone et reçoit le contexte comme argument. Lisez la documentation sur les [Données asynchrones](/guide/async-data) pour savoir comment cela fonctionne.                                                                                                                                                                                                                                                                         |
| `fetch`       | Utilisé pour peupler le store avant de faire le rendu de la page, équivalent à la méthode `data` sauf qu'il ne peuple pas le composant `data`. Voir [la partie Pages de l'API sur `fetch`](/api/pages-fetch).                                                                                                                                                                                                                                                                    |
| `head`        | Défini des balises meta spécifiques pour la page en cours, voir [la partie Pages de l'API sur `head`](/api/pages-head).                                                                                                                                                                                                                                                                                                                                                          |
| `layout`      | Défini une mise en page existantes dans le répertoire `layouts`, voir [la partie Pages de l'API sur `layout`](/api/pages-layout).                                                                                                                                                                                                                                                                                                                                                |
| `loading`     | Si mis à `false`, empèche la page d'appeler automatiquement `this.$nuxt.$loading.finish()` quand vous allez dessus et `this.$nuxt.$loading.start()` quand vous la quittez. Cela vous permet de **manuellement** contrôller ce comportement. Voir l'[exemple](https://nuxtjs.org/examples/custom-page-loading). Seulement appliqué si `loading` est défini dans `nuxt.config.js`. Voir la [documentation de l'API sur la configuration de `loading`](/api/configuration-loading). |
| `transition`  | Défini une transition spécifique pour une page, voir [la partie Pages de l'API sur `transition`](/api/pages-transition).                                                                                                                                                                                                                                                                                                                                                         |
| `scrollToTop` | Booléen (par défaut: `false`). Indique si vous souhaitez que la position se déplace vers le haut avant d'afficher la page. Est utilisé pour les [Routes imbriquées](/guide/routing#routes-imbriqu-es).                                                                                                                                                                                                                                                                           |
| `validate`    | Fonction de validation pour les [Routes dynamiques](/guide/routing#routes-dynamiques).                                                                                                                                                                                                                                                                                                                                                                                           |
| `middleware`  | Défini un middleware pour cette page. Ce middleware sera exécuté avant d'effectuer le rendu de la page. Voir le [Middleware dans le Routage](/guide/routing#middleware).                                                                                                                                                                                                                                                                                                         |

Pour plus d'informations à propos de l'utilisation des attributs de pages, consultez [la partie Pages de l'API](/api)

## Entête HTML

Nuxt.js utilise [vue-meta](https://github.com/declandewet/vue-meta) pour mettre à jour les `headers` et les `html attributes` de votre application.

Nuxt.js configure `vue-meta` avec les options suivantes :

```js
{
  keyName: 'head', // le nom de l'option où vue-meta va chercher les informations.
  attribute: 'data-n-head', // l'attribut que vue-meta ajoute aux balises observées
  ssrAttribute: 'data-n-head-ssr', // le nom de l'attribut qui permet à vue-meta de savoir que la meta information a déjà été générée par le serveur
  tagIDKeyName: 'hid' // Le nom de la propriété que vue-meta utilise pour déterminer s'il faut écraser ou ajouter une balise
}
```

### Balises meta par défaut

Nuxt.js vous permet de définir tous les meta par défaut de votre application dans `nuxt.config.js`, en utilisant la même propriété `head` :

Exemple d'un viewport spécifique et d'une police Google personnalisée :

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

Pour connaitre la liste des options que vous pouvez donner à `head`, jeter un œil à la [documentation vue-meta](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).

More information about the `head` method: [API Configuration `head`](/api/configuration-head).

### Balises meta personnalisées pour une page

Plus d'informations à propos de la méthode `head` dans [la partie Configuration de l'API sur `head`](/api/pages-head).

<p class="Alert">Afin d'éviter toutes duplications lors de l'utilisation d'un composant enfant, donnez un identifiant unique à l'aide de l'attribut `hid`. Pour [en savoir plus](https://github.com/declandewet/vue-meta#lists-of-tags).</p>
