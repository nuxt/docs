---
title: Structure des répertoires
description: La structure par défaut d'une application Nuxt.js est destinée à fournir un excellent point de départ pour les petites et grandes applications. Bien sûr, vous êtes libre d'organiser votre application comme vous le souhaitez.
---

> La structure par défaut d'une application Nuxt.js est destinée à fournir un excellent point de départ pour les petites et grandes applications. Bien sûr, vous êtes libre d'organiser votre application comme vous le souhaitez.

## Répertoires

### Le répertoire des ressources

Le répertoire `assets` contient vos ressources non compilées tels que vos fichiers Less, Sass ou JavaScript.

[Consultez la documentation à propos de l'intégration des ressources](/guide/assets)

### Le répertoire des composants

Le répertoire `components` contient vos composants Vue.js. Nuxt.js ne surcharge pas la méthode `data` sur ces composants.

### Le répertoire des mises en page

Le répertoire `layouts` contient vos mises en page.

_Ce répertoire ne peut pas être renommé._

[Consultez la documentation à propos de l'intégration des mises en page](/guide/views#layouts)

### Le répertoire des middlewares

Le répertoire `middleware` contient vos middlewares. Un middleware vous permet de définir une fonction qui sera exécutée avant de faire le rendu d'une mise en page ou d'un groupe de mises en page.

[Consultez la documentation à propos de l'intégration des middlewares](/guide/routing#middleware)

### Le répertoire des pages

Le répertoire `pages` contient vos vues et routes de l'application. Le framework lit tous vos fichiers `.vue` au sein de ce répertoire et crée automatiquement le routage de votre application.

_Ce répertoire ne peut pas être renommé._

[Consultez la documentation à propos de l'intégration des pages](/guide/views)

### Le répertoire des plugins

Le répertoire `plugins` contient les plugins JavaScript que vous désirez exécuter avant d'instancier l'application Vue.js racine.

[Consultez la documentation à propos de l'intégration des plugins](/guide/plugins)

### Le répertoire des fichiers statiques

Le répertoire `static` contient vos fichiers statiques. Chaque fichier au sein de ce répertoire est mappé à `/`.

**Exemple :** `/static/robots.txt` est mappé à `/robots.txt`

_Ce répertoire ne peut pas être renommé._

[Consultez la documentation à propos de l'intégration des fichiers statiques](/guide/assets#static)

### Le répertoire des stores

Le répertoire `store` contient vos fichiers de [store Vuex](https://vuex.vuejs.org/fr/). Les stores Vuex sont implémentés de manière optionnelle dans le framework Nuxt.js. La création d'un fichier `index.js` dans ce répertoire active automatiquement l'option dans le framework.

_Ce répertoire ne peut pas être renommé._

[Consultez la documentation à propos de l'intégration des stores Vuex](/guide/vuex-store)

### Le fichier nuxt.config.js

Le fichier `nuxt.config.js` contient vos configurations personnalisées concernant Nuxt.js.

_Ce fichier ne peut pas être renommé._

[Consultez la documentation à propos de l'intégration de `nuxt.config.js`](/guide/configuration)

### Le fichier package.json

Le fichier `package.json` contient les dépendances et scripts de votre application.

_Ce fichier ne peut pas être renommé._

## Alias

| Alias | Répertoire |
|-----|------|
| `~` or `@` | [srcDir](/api/configuration-srcdir) |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

Par défaut, `srcDir` est le même répertoire que `rootDir`.

<p class="Alert Alert--nuxt-green"><b>Info :</b> à l'intérieur de vos templates `vue`, si vous avez besoin de faire référence à vos répertoires `assets` ou `static`, utilisez par ex. `~/assets/votre_image.png` et `~/static/votre_image.png`.</p>
