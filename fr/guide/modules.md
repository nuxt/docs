---
title: Modules (EN)
description: Les modules sont des extensions de Nuxt.js qui augmentent ses fonctionnalités et permettent de l'intégration continue.
---

> Les modules sont des extensions de Nuxt.js qui augmentent ses fonctionnalités et permettent de l'intégration continue.

## Introduction

Pendant la phase d'amélioration de votre application pour la production avec Nuxt, vous allez découvrir que les fonctionnalités du coeur du framework
ne sont pas complètes. Nuxt peut être étendu avec des options de configuration et des plugins,
mais maintenir ces paramétrages à travers de multiples projets est répétitif, ennuyant et prend du temps.
D'un autre côté, supporter toutes les attentes des projets par défaut rendrait Nuxt très complexe et dure à utiliser.

C'est pourquoi Nuxt introduit un système modulaire d'ordre supérieur pour facilement étendre ses fonctionnalités de base.
Les modules sont en fait des **fonctions** qui sont appelées de manière séquentielle lors de la phase de démarrage de Nuxt.
Le framework va attendre que chacun d'entre eux soit chargé avant de continuer son travail.
De cette façon, les modules peuvent personnaliser le moindre aspect de Nuxt.
Merci au design modulaire de Nuxt (basé sur [Tapable](https://github.com/webpack/tapable) de webpack),
les modules peuvent facilement abonner des points d'ancrage (« hooks ») pour certaines étapes comme l'initialisation de la phase de build.
Les modules peuvent également remplacer les templates, configurer les chargeurs de webpack, ajouter des bibliothèques CSS et effectuer un grand nombre de tâches utiles.

Le meilleur de tout ça, les modules de Nuxt peuvent être intégrés dans des packages NPM.
Cela les rend facilement réutilisables à travers de projets et partageables avec la communauté de Nuxt,
aidant ainsi à créer un éco-système d'add-on Nuxt de grande qualité.

Les modules sont bien si :

- vous êtes un membre d'une **équipe agile** qui souhaite mettre en place rapidement un nouveau projet.
- vous êtes fatigué de **réinventer** la roue pour les tâches habituelles comme des mécanismes Google Analytics.
- Vous êtes un membre super enthousiaste de la communauté *Open Source* et que vous souhaitez *partager* votre travail avec la communauté d'une façon simple.
- vous êtes membre d'une **société** qui accorde de l'importance à la **qualité** et la **réutilisabilité**.
- Vous êtes souvent confronté à des échéances serrées et vous n'avez pas le temps de vous encombrer avec les détails de toutes les nouvelles librairies ou leurs intégrations.
- Vous êtes fatigué de faire face aux changements des API bas niveau et vous souhaiter **simplement que les choses fonctionnent**.

## Liste des modules Nuxt.js

L'équipe Nuxt.js offre des modules **officielles** :
- [@nuxt/http](https://http.nuxtjs.org): Manière minimaliste et universelle de faire des requêtes HTTP, basé sur [ky-universal](https://github.com/sindresorhus/ky-universal)
- [@nuxtjs/axios](https://axios.nuxtjs.org): Manière simple et sécurisé d'intégrer Axios avec Nuxt.js pour faire des requêtes HTTP
- [@nuxtjs/pwa](https://pwa.nuxtjs.org): Améliore Nuxt avec des tests solides, mis à jour et une solution PWA stable
- [@nuxtjs/auth](https://auth.nuxtjs.org): Module d'authentication pour Nuxt.js, offrant différents schémas et stratégies

Une liste de modules pour Nuxt.js réalisés par la communauté est disponible sur https://github.com/topics/nuxt-module

## Écrire un module basique

Comme précédemment mentionnés, les modules sont juste de simples fonctions. Ils peuvent être packagés en tant que modules npm ou directement inclus dans le code source du projet.

**modules/simple.js**

```js
export default function SimpleModule (moduleOptions) {
  // Écrivez votre code ici
}

// REQUIS en cas de publication en tant que package npm
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

Ceci est un objet passé en utilisant le tableau `modules` par les utilisateurs qui souhaitent personnaliser son comportement.

**`this.options`**

Vous pouvez accéder directement aux options de Nuxt en utilisant cette référence. C'est la configuration `nuxt.config.js` avec ses options par défaut assignées qui peuvent être utilisées en tant qu'options partagées à travers les modules.

**`this.nuxt`**

C'est une référence à l'instance courante de Nuxt. Consultez la documentation sur la [Classe Nuxt](/api/internals-nuxt) pour obtenir les méthodes disponibles.

**`this`**

Le contexte des modules. Consultez la documentation sur la classe [ModuleContainer](/api/internals-module-container) pour obtenir les méthodes disponibles.

**`module.exports.meta`**

Cette ligne est **obligatoire** si vous publiez un module en tant que package npm. Nuxt utilise en interne les meta pour mieux fonctionner avec votre package.

**nuxt.config.js**

```js
export default {
  modules: [
    // Utilisation simple
    '~/modules/simple'

    // Passage des options directement
    ['~/modules/simple', { token: '123' }]
  ]
}
```

Nous pouvons dire à Nuxt de charger des modules spécifiques pour un projet avec des paramètres optionnels en tant qu'options.
Consultez la documentation sur la [configuration des modules](/api/configuration-modules) pour plus d'informations !

## Modules asynchrones

Tous les modules ne font pas tout de manière synchrone. Par exemple vous pouvez développer un module qui a besoin d'aller récupérer des informations depuis une API ou qui fait des échanges asynchrones. Nuxt permet le support de modules asynchrones grâce à l'utilisation d'une promesse ou d'une fonction de rappel.

### Utilisation de async / await

<div class="Alert Alert--orange">

Faites attention avec `async` et `await`, ils sont supportés uniquement depuis Node.js 7.2+. Donc si vous êtes un développeur de modules, n'oubliez pas d'avertir vos utilisateurs si vous les utilisez. Pour des modules asynchrones plus stables ou avec un support des versions antérieures vous pouvez utiliser un empaqueteur pour les transformer en de vieille version de compatibilité Node.js ou utilisant des méthodes de promesse.

</div>

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // Vous pouvez développer de manière asynchrone ici en utilisant `async` / `await`
  let pages = await fse.readJson('./pages.json')
}
```

### Retourner une promesse

```js
import axios from 'axios'

export default function asyncModule() {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Faites quelque chose en étendant les routes de Nuxt
    })
}
```

### Utiliser des fonctions de rappel

```js
import axios from 'axios'

export default function asyncModule(callback) {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      callback()
    })
}
```

## Exemples courants

### Options de haut niveau

Parfois il est plus simple d'utiliser des options de haut niveau lors de l'abonnement de modules à `nuxt.config.js`.
Cela nous permet de combiner les options de sources multiples.

**nuxt.config.js**

```js
export default {
  modules: [
    ['@nuxtjs/axios', { anotherOption: true }]
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
export default function (moduleOptions) {
  // `options` contiendra option1, option2 et anotherOption
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### Fournir des plugins

Il est courant que les modules fournissent un ou plusieurs plugins quand ils sont ajoutés.
Par exemple le module [bootstrap-vue](https://bootstrap-vue.js.org) nécessite d'être abonné lui-même dans Vue.
Dans certaines situations nous pouvons utiliser le helper `this.addPlugin`.

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
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
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
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
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Ajout de Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Fournir des ressources

<!-- todo: up2date? -->

On peut abonner des plugins webpack pour fournir des ressources pendant la phase de build.

**module.js**

```js
export default function (moduleOptions) {
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
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // Le loader `.foo`
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Personnalisation des loaders existants
      // Consultez le code source des mécanismes de Nuxt :
      // https://github.com/nuxt/nuxt.js/tree/dev/packages/builder/src/webpack/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Lancer des tâches sur des points d'ancrage spécifiques

Votre module peut avoir besoin de choses seulement sous certaines conditions et pas seulement lors de l'initialisation de Nuxt.
Nous utilisons le puissant système de plugin [Hookable](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/hookable.js) pour réaliser des tâches sur des évènements spécifiques.
Nuxt va les attendre si les points d'ancrage retournent une promesse ou sont définis comme `async`.

Voici quelques exemples basiques :

```js
export default function myModule() {

  this.nuxt.hook('modules:done', moduleContainer => {
   // Ceci sera appelé quand tous les modules auront fini d'être chargés
  })

  this.nuxt.hook('render:before', renderer => {
    // Ceci sera appelé après la création du moteur de rendu
  })

  this.nuxt.hook('build:compile', async ({name, compiler }) => {
   // Ceci sera appelé avant le lancement du compilateur (par défaut : webpack)
  })

  this.nuxt.hook('generate:before', async generator => {
    // Ceci sera appelé avant que Nuxt génère vos pages
  })
}
```

## Module package commands (EN)

**Experimental**

Starting in `v2.4.0`, you can add custom nuxt commands through a Nuxt module's package. To do so, you must follow the `NuxtCommand` API when defining your command. A simple example hypothetically placed in `my-module/bin/command.js` looks like this:

```js
#!/usr/bin/env node

const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')

NuxtCommand.run({
  name: 'command',
  description: 'My Module Command',
  usage: 'command <foobar>',
  options: {
    foobar: {
      alias: 'fb',
      type: 'string',
      description: 'Simple test string'
    }
  },
  run(cmd) {
    consola.info(cmd.argv)
  }
})
```

A few things of note here. First, notice the call to `/usr/bin/env` to retrieve the Node executable. Also notice that ES module syntax can't be used for commands unless you manually incorporate [`esm`](https://github.com/standard-things/esm) into your code.

Next, you'll notice how `NuxtCommand.run()` is used to specify the settings and behavior of the command. Options are defined in `options`, which get parsed via [`minimist`](https://github.com/substack/minimist).
Once arguments are parsed, `run()` is automatically called with the `NuxtCommand` instance as first parameter.

In the example above, `cmd.argv` is used to retrieve parsed command-line arguments. There are more methods and properties in `NuxtCommand` -- documentation on them will be provided as this feature is further tested and improved.

To make your command recognizable by the Nuxt CLI, list it under the `bin` section of your package.json, using the `nuxt-module` convention, where `module` relates to your package's name. With this central binary, you can use `argv` to further parse more `subcommands` for your command if you desire.

```js
{
  "bin": {
    "nuxt-foobar": "./bin/command.js"
  }
}
```

Once your package is installed (via NPM or Yarn), you'll be able to execute `nuxt foobar ...` on the command-line.

<div class="Alert">

Il existe beaucoup d'autres points d'ancrage et de possibilités pour les modules. Consultez les [mécanismes de Nuxt](/api/internals) pour en apprendre plus à propos de l'API interne de Nuxt.

</div>

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
