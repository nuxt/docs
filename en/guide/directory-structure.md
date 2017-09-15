---
title: Structure des répertoires
description: La structure d'application Nuxt.js par défaut est destinée à fournir un excellent point de départ pour les applications petites et grandes. Bien sûr, vous êtes libre d'organiser votre application comme vous le souhaitez.
---

> La structure d'application Nuxt.js par défaut est destinée à fournir un excellent point de départ pour les applications petites et grandes. Bien sûr, vous êtes libre d'organiser votre application comme vous le souhaitez.

## Répertoires

### Le répertoire Assets

Le répertoire `assets` contient vos *assets*  non-compilés (p.e. LESS, SASS, or JavaScript).

[Plus de documentation à propos des Assets](/guide/assets)

### Le répertoire Components

Le répertoire `components` contient vos composants Vue.js. Nuxt.js ne *supercharge* pas la méthode `data` sur ces composants.

### Le répertoire Layouts

Le répertoire `layouts` contient vos layouts.

*Ce répertoire ne peut pas être renommé.*

[Plus de documentation à propos des Layouts](/guide/views#layouts)

### Le répertoire Middleware

Le répertoire `middleware` contient vos Middleware. Un middleware vous permets de définir une fonction qui sera exécutée avant de faire le rendu d'une page ou d'un groupe de pages (layouts).

[Plus de documentation à propos des Middleware](/guide/routing#middleware)

### Le répertoire Pages

Le répertoire `pages` contient vos vues (*Views*) et vos routes (*Routes*). Le framework lit tous vos fichiers `.vue` au sein de ce répertoire et créé automatiquement le routage de votre application.

*Ce répertoire ne peut pas être renommé.*

[Plus de documentation à propos des Pages](/guide/views)

### Le répertoire Plugins

Le répertoire `plugins` contient vos plugins Javascript que vous désirez exécuter avant d'instancier la racine de l'application vue.js.

[Plus de documentation à propos des Plugins](/guide/plugins)

### Le répertoire Static

Le répertoire `static` contient vos fichiers statiques. Chaque fichier au sein de ce répertoire est mappé vers /.

**Exemple:** /static/robots.txt est mappé vers /robots.txt

*Ce répertoire ne peut pas être renommé.*

[Plus de documentation à propos des fichiers statiques](/guide/assets#static)

### Le répertoire Store

Le répertoire `store` contient vos fichiers [Vuex Store](http://vuex.vuejs.org). Vuex Store est implémenté de manière optionnelle dans le framework Nuxt.js. La création d'un fichier `index.js` dans ce répertoire active automatiquement l'option dans le framework.

*Ce répertoire ne peut pas être renommé.*

[Plus de documentation à propos des Store](/guide/vuex-store)

### Le fichier nuxt.config.js

Le fichier `nuxt.config.js` contient vos configurations personnalisées concernant Nuxt.js.

*Ce fichier ne peut pas être renommé.*

[Plus de documentation à propos de nuxt.config.js](/guide/configuration)

### Le fichier package.json

Le fichier `package.json` contient les dépendances et scripts de votre application.

*Ce fichier ne peut pas être renommé.*

## Alias

| Alias | Répertoire |
|-----|------|
| ~ | / |
| ~assets | /assets |
| ~components | /components |
| ~middleware | /middleware |
| ~pages | /pages |
| ~plugins | /plugins |
| ~static | /static |

Alias redirigeant vers des fichiers:

| Alias | Utilisation | Description |
|-------|------|--------------|
| ~store | `const store = require('~store')` | Importe l'instance du store `vuex`. |
| ~router | `const router = require('~router')`| Importe l'instance `vue-router`. |
