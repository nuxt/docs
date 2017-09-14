---
title: Introduction
description: « Le 25 octobre 2016, l'équipe derrière zeit.co, annonçait Next.js, un framework pour les applications React rendues côté serveur. Quelques heures après l'annonce, l'idée de créer un équivalent pour les applications Vue.js était évidente : Nuxt.js était né. »
---

> Le 25 octobre 2016, l'équipe derrière [zeit.co](https://zeit.co/), annonçait [Next.js](https://zeit.co/blog/next), un framework pour les applications React rendues côté serveur. Quelques heures après l'annonce, l'idée de créer un équivalent pour les applications [Vue.js](https://fr.vuejs.org) était évident : Nuxt.js était né.

## Nuxt.js, qu’est-ce que c’est ?

Nuxt.js est un framework pour créer des applications Vue.js universelles.

Son champ principal est de **faire le rendu d'interface utilisateur (« UI »)** en faisant abstraction de la distribution au client et au serveur.

Notre but est de créer un framework suffisamment flexible afin que vous puissiez l'utiliser comme base dans un projet principal ou en tant que supplément pour votre projet actuel basé sur Node.js.

Nuxt.js prédéfinit toute la configuration nécessaire pour faire de votre développement d'application Vue.js rendue côté serveur quelque chose d'agréable.

En outre, nous fournissons également une autre option de déploiement appelée : *nuxt generate*. Elle permet de construire une application Vue.js **générée statiquement**.
Nous croyons que cette option pourrait être la prochaine étape importante dans le développement d'applications web avec microservices.

En tant que framework, Nuxt.js est doté de nombreuses fonctionnalités pour vous aider dans votre développement entre côté client et serveur telles que les données asynchrones, les *middlewares*, les *layouts*, etc.

## Comment ça marche

![Vue avec webpack et Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js inclut les éléments suivants afin de créer une expérience de développement optimale :

- [Vue 2](https://github.com/vuejs/vue)
- [Vue Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex) (inclut uniquement quand l'[option `store`](/guide/vuex-store) est activée)
- [Vue Meta](https://github.com/declandewet/vue-meta)

Un total de seulement **57ko min+gzip** (53ko avec Vuex).

Sous le capot, nous utilisons [webpack](https://github.com/webpack/webpack) avec [vue-loader](https://github.com/vuejs/vue-loader) et [babel-loader](https://github.com/babel/babel-loader) pour empaqueter (« bundle »), scinder (« code-split ») et minifier votre code.

## Fonctionnalités

- Utilisation des fichiers Vue (`*.vue*`)
- Scission de code automatique
- Rendu coté serveur (ou « SSR » pour « Server-Side Rendering »)
- Système de routage puissant à l'aide de données asynchrones
- Génération de fichiers statiques
- Transpilation ES6/ES7
- Empaquetage et minification de vos fichiers JS et CSS
- Gestion des éléments de balise d'en-tête `<head>` HTML (`<title>`, `<meta>`, etc.)
- Rechargement à chaud pendant le développement
- Pré-processeur : Sass, Less, Stylus, etc.

## Schéma

Ce schéma (en anglais) montre ce qui est invoqué par nuxt.js quand le serveur est appelé ou quand l'utilisateur navigue dans l'application à l'aide de `<nuxt-link>` :

![nuxt-schema](/nuxt-schema.png)

## Rendu côté serveur (SSR universel)

Vous pouvez utiliser nuxt.js comme framework pour gérer le rendu complet de l'interface utilisateur de votre projet.

En utilisant la commande `nuxt`, Nuxt va démarrer un serveur de développement avec rechargement à chaud et [Vue Server Renderer](https://ssr.vuejs.org/fr/) configurés afin de servir automatiquement le rendu de votre application fait côté serveur.

Jetez un œil aux [commandes](/guide/commands) pour en savoir plus.

Si vous avez déjà un serveur, vous pouvez greffer nuxt.js en l'utilisant comme middleware. Il n'y a aucune restrictions quand vous utilisez nuxt.js pour développer votre application web universelle; voir le guide [Using Nuxt.js Programmatically](/api/nuxt).

## Génération d'applications statique

La grande innovation de nuxt.js est: `nuxt generate`

Lors de la création de votre application, il générera le code HTML de chacune de vos routes pour le stocker dans un fichier.

Exemple:

```bash
-| pages/
----| about.vue
----| index.vue
```

Va générer:
```
-| dist/
----| about/
------| index.html
----| index.html
```

De cette façon, vous pouvez héberger votre application web sur n'importe quel hébergement statique!

Le meilleur exemple est ce site web. Il est généré et hébergé sur GitHub Pages:
- [Code source](https://github.com/nuxt/nuxtjs.org) (en anglais)
- [Code généré](https://github.com/nuxt/nuxtjs.org/tree/gh-pages) (en anglais)

Nous ne voulons pas devoir générer manuellement l'application à chaque fois que nous mettons à jour la [documentation](https://github.com/nuxt/docs), du coup chaque modification réalisée invoque une fonction AWS Lambda qui:
1. Clone le [répertoire nuxtjs.org](https://github.com/nuxt/nuxtjs.org)
2. Installe les dépendances via `npm install`
3. Lance `nux generate`
4. Déploie le dossier `dist` sur la branche `gh-pages`

Et nous voilà avec une **Serverless Static Generated Web Application** :)

Nous pouvons aller plus loin en imaginant une application d'e-commerce créée avec `nuxt generate` et hébergée sur un CDN, et regénérée à chaque fois qu'un produit est en rupture de stock ou de retour en stock. Mais si l'utilisateur navigue à sur l'application en attendant, il vera les informations à jour grâce aux appels API effectués sur l'API de l'e-commerce. Pas besoin d'avoir plusieurs instances d'un serveur ainsi qu'un cache supplémentaire!
