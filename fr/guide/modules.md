---
title: Modules
description: Les modules sont des extensions de Nuxt.js qui augmentent ses fonctionnalités et permettent de l'intégration continue.
---

> Les modules sont des extensions de Nuxt.js qui augmentent ses fonctionnalités et permettent de l'intégration continue.

## Introduction

Pendant la phase d'amélioration de votre application pour la production, vous allez découvrir que les fonctionnalités offertes par celui-ci ne sont pas complètes. Faire la configuration et ajouter les plugins de chaque projet est répétitif, ennuyant et prend du temps. Ajouter chaque nouvelle fonctionnalité dans Nuxt serait impossible sans rendre le framework lourd.

C'est pourquoi Nuxt introduit un système modulaire d'ordre supérieur pour facilement étendre ses fonctionnalités de base. Les modules sont en fait des **fonctions** qui sont appelées de manière séquentielle lors de la phase de démarrage de Nuxt. Le cœur va attendre que chacun d'entre eux soit chargé avant de continuer son travail. Ainsi vous avez la possibilité de personnaliser le moindre aspect de Nuxt. Grâce à sa conception modulaire ainsi que webpack [Tapable](https://github.com/webpack/tapable), il peut également abonner des points d'ancrage (« hooks ») pour certaines étapes comme l'initialisation de la phase de build.

Un autre point à propos des modules est qu'ils peuvent être refactorisés et packagés en dehors du projet de manière à être versionnés en tant que packages npm. Ainsi vous pouvez partager et utiliser des intégrations et solutions de qualité auprès de la communauté Nuxt sans effort ! Vous pourriez être intéressé par les modules si :

- vous êtes un membre d'une **équipe agile** qui souhaite mettre en place son projet instantanément et éviter de **réinventer** la roue pour les tâches habituelles comme des mécanismes Google Analytics pour vos nouveaux projets,
- vous êtes une **société** qui accorde de l'importance à la **qualité** et la **réutilisabilité** de ses projets,
- Vous êtes un membre super enthousiaste de la communauté *Open Source* et que vous souhaitez *partager* avec la communauté d'une façon simple.
- Vous êtes un développeur occupé et vous n'aimez pas vous encombrer avec des détails comme le paramétrage de chaque nouvelle bibliothèque ou intégration (quelqu'un l'aura surement déjà fait pour vous, ou vous pourriez demander à quelqu'un de la communauté de le faire).
- Vous êtes fatigué de l'utilisation des API bas niveau et de leur changement continu et vous souhaiter **simplement des choses fonctionnelles**.

## Écrire un module basique

Comme précédemment mentionnés, les modules sont juste de simples fonctions. Ils peuvent être packagés en tant que modules npm ou directement inclus dans le code source du projet.

**modules/simple.js**

```js
module.exports = function SimpleModule (moduleOptions) {
  // Écrivez votre code ici
}

// Requis en cas de publication en tant que package npm
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

Ceci est un objet passé en utilisant le tableau `modules` par les utilisateurs qui souhaitent personnaliser son comportement.

**`this.options`**

Vous pouvez accéder directement aux options de Nuxt en utilisant cette référence. C'est la configuration `nuxt.config.js` avec ses options par défaut assignées qui peuvent être utilisées en tant qu'options partagées à travers les modules.

**`this.nuxt`**

C'est une référence à l'instance courante de Nuxt. Consultez la documentation sur la [Classe Nuxt](/api/internals-nuxt) pour obtenir les méthodes disponibles.

**`this`**

Le contexte des modules. Consultez la documentation sur la [Classe ModuleContainer](/api/internals-module-container) pour obtenir les méthodes disponibles.

**`module.exports.meta`**

Cette ligne est **obligatoire** si vous publiez un module en tant que package npm. Nuxt utilise en interne les meta pour mieux fonctionner avec votre package.

**nuxt.config.js**

```js
module.exports = {
  modules: [
    // Utilisation simple
    '~/modules/simple'

    // Passage des options
    ['~/modules/simple', { token: '123' }]
  ]
}
```

Nous pouvons dire à Nuxt de charger des modules spécifiques pour un projet avec des paramètres optionnels en tant qu'options. Consultez la documentation sur la [configuration des modules](/api/configuration-modules) pour plus d'informations !

## Modules asynchrones

Tous les modules ne font pas tout de manière synchrone. Par exemple vous pouvez développer un module qui a besoin d'aller récupérer des informations depuis une API ou qui fait des échanges asynchrones. Nuxt permet le support de modules asynchrones grâce à l'utilisation d'une promesse ou d'une fonction de rappel.

### Utilisation de async / await

<p class="Alert Alert--orange">Faites attention avec `async` et `await`, ils sont supportés uniquement depuis Node.js 7.2+. Donc si vous êtes un développeur de modules, n'oubliez pas d'avertir vos utilisateurs si vous les utilisez. Pour des modules asynchrones plus stables ou avec un support des versions antérieures vous pouvez utiliser un paqueteur pour les transformer en de vieille version de compatibilité Node.js ou utilisant des méthodes de promesse.</p>

```js
const fse = require('fs-extra')

module.exports = async function asyncModule() {
  // Vous pouvez développer de manière asynchrone ici en utilisant `async` / `await`
  let pages = await fse.readJson('./pages.json')
}
```

### Retourner une promesse

```js
const axios = require('axios')

module.exports = function asyncModule() {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Faites quelque chose en étendant les routes de Nuxt
    })
}
```

### Utiliser des fonctions de rappel

```js
const axios = require('axios')

module.exports = function asyncModule(callback) {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      callback()
    })
}
```


## Exemples courants

### Options de haut niveau

Parfois il est plus simple d'utiliser des options de haut niveau lors de l'abonnement de modules à `nuxt.config.js`. Donc nous pouvons combiner les options de sources multiples.

**nuxt.config.js**

```js
module.exports = {
  modules: [
    '@nuxtjs/axios'
  ],

  // Le module axios est informé de cela via `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

**module.js**

```js
module.exports = function (moduleOptions) {
  const options = Object.assign({}, this.options.axios, moduleOptions)
  // ...
}
```

### Fournir des plugins

Il est courant que les modules fournissent un ou plusieurs plugins quand ils sont ajoutés. Par exemple le module [bootstrap-vue](https://bootstrap-vue.js.org) nécessite d'être abonné lui-même dans Vue. Pour cela, nous pouvons utiliser la fonction utilitaire `this.addPlugin`.

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
const path = require('path')

module.exports = function nuxtBootstrapVue (moduleOptions) {
  // Abonner le template `plugin.js`
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### Template plugins

Abonner des templates et des plugins peut influencer les [templates lodash](https://lodash.com/docs/4.17.4#template) pour changer conditionnellement les sorties des plugins abonnés.

**plugin.js**

```js
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Code uniquement pour le développement
<% } %>
```

**module.js**

```js
const path = require('path')

module.exports = function nuxtBootstrapVue (moduleOptions) {
  // Abonner le template `plugin.js`
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt remplacera `options.ua` par `123` quand il copiera le plugin au projet.
      ua: 123,

      // les parties conditionnelles vont être retirées du code du plugin pour les builds de production
      debug: this.options.dev
    }
  })
}
```

### Ajouter une bibliothèque CSS

Vérifiez toujours si la même bibliothèque CSS n'a pas déjà été fournie pour éviter les ajouts en doublon et ajoutez toujours une **option de désactivation** de la bibliothèque CSS dans votre module. Voyez cela dans l'exemple ci-dessous.

**module.js**

```js
module.exports = function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Ajout de Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Fournir des ressources

On peut abonner des plugins webpack pour fournir des ressources pendant la phase de build.

**module.js**

```js
module.exports = function (moduleOptions) {
  const info = 'Construit par le module awesome - 1.3 alpha le ' + Date.now()

  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {

        // Cela va générer `.nuxt/dist/info.txt' avec les contenus des variables d'information.
        // La source peut être aussi mise en tampon
        compilation.assets['info.txt'] = { source: () => info, size: () => info.length }

        cb()
      })
    }
  })
}
```

### Abonner des loaders personnalisés

Nous pouvons faire la même chose que `build.extend` dans `nuxt.config.js` en utilisant `this.extendBuild`.

**module.js**

```js
module.exports = function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // Le loader `.foo`
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Personnalisation des loaders existants
      // Consultez le code source des mécanismes de Nuxt :
      // https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/webpack/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Lancer des tâches sur des points d'ancrage spécifiques

Votre module peut avoir besoin de choses seulement sous certaines conditions et pas seulement lors de l'initialisation de Nuxt. Nous utilisons le puissant système de plugin [Tapable](https://github.com/webpack/tapable) pour réaliser des tâches sur des évènements spécifiques. Nuxt va les attendre si les points d'ancrage retournent une promesse ou sont définis comme `async`.

```js
module.exports = function () {
  // Ajoute un point d'ancrage au module
  this.nuxt.hook('module', moduleContainer => {
    // Ceci sera appelé quand tous les modules auront fini d'être chargés
  })

  // Ajoute un point d'ancrage au moteur de rendu
  this.nuxt.hook('module', moduleContainer => {
    // Ceci sera appelé quand le moteur de rendu aura été créé
  })

  // Ajoute un point d'ancrage au build
  this.nuxt.hook('build', async builder => {
    // Ceci sera appelé une fois le build fait

    // On peut également enregistrer des points d'ancrage interne ici
    builder.hook('compile', ({compiler}) => {
        // Ceci sera lancé juste avant que le compilateur de webpack démarre
    })
  })

  // Ajoute un point d'ancrage à la génération
  this.nuxt.hook('generate', async generator => {
    // Ceci sera appelé quand la génération de Nuxt va commencer
  })
}
```

<p class="Alert">Il existe beaucoup d'autres points d'ancrage et de possibilités pour les modules. Consultez les [mécanismes de Nuxt](/api/internals) pour en apprendre plus à propos de l'API interne de Nuxt.</p>
