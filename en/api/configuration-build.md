---
title: "API : La propriété build"
description: Nuxt.js vous permet de personnaliser la configuration webpack pour générer l'application web que vous souhaitez.
---

# La propriété build

> Nuxt.js vous permet de personnaliser la configuration webpack pour générer l'application web que vous souhaitez.

## analyze

> Nuxt.js utilise [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyze) pour vous permettre de visualiser vos paquetages (« bundles ») et les optimiser.

- Type : `Boolean` ou `Object`
- Par défaut : `false`

Si c'est un objet, consultez les propriétés disponibles [ici](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

Exemple (`nuxt.config.js`) :

```js
module.exports = {
  build: {
    analyze: true,
    // ou
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<p class="Alert Alert--teal">**Info :** vous pouvez utiliser la commande `nuxt build --analyze` ou `nuxt build -a` pour générer votre application et lancer l'analyse du paquetage sur [http://localhost:8888](http://localhost:8888).</p>

## babel

> Personnaliser la configuration Babel pour les fichiers JavaScript et Vue.

- Type : `Object`
- Par défaut :

  ```js
  {
    presets: ['vue-app']
  }
  ```

Exemple (`nuxt.config.js`) :

```js
module.exports = {
  build: {
    babel: {
      presets: ['es2015', 'stage-0']
    }
  }
}
```

## cssSourceMap

- Type : `boolean`
- Par défaut : `true` en développement et `false` en production.

> Active le support Source Map du CSS

## devMiddleware

- Type : `Object`

Voir [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) pour les options disponibles.

## extend

> Étendre la configuration webpack manuellement pour les paquetages client et serveur.

- Type : `Function`

`extend` est appelé deux fois, une fois pour le paquetage serveur et une fois pour le paquetage client. Les arguments de la méthode sont :

1. l'objet de configuration webpack,
2. un objet avec les propriétés suivantes (toutes booléennes): `isDev`, `isClient`, `isServer`.

Exemple (`nuxt.config.js`) :

```js
module.exports = {
  build: {
    extend (config, { isClient }) {
      // Étend la configuration webpack uniquement pour le paquetage client
      if (isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
```

Si vous voulez en savoir plus à propos de notre configuration webpack par défaut, consultez [le répertoire webpack](https://github.com/nuxt/nuxt.js/tree/master/lib/builder/webpack).

## extractCSS

> Activer l'extraction des CSS communs en utilisant [le guide](https://ssr.vuejs.org/en/css.html) de Vue Server Renderer.

- Type : `Boolean`
- Par défaut : `false`

Utiliser `extract-text-webpack-plugin` pour extraire le CSS du fragment principal dans un fichier CSS séparé (injection automatique avec template), permet au fichier d'être mis en cache de manière individuel. Cela est recommandé quand il y a beaucoup de fichiers CSS partagés. Les fichiers CSS à l'intérieur des composants asynchrones vont rester en place en tant que chaines de caractères JavaScript et prise en charge par `vue-style-loader`.

## filenames

> Personnaliser les noms des paquetages.

- Type : `Object`
- Par défaut :

  ```js
  {
    css: 'common.[contenthash].css',
    manifest: 'manifest.[hash].js',
    vendor: 'common.[chunkhash].js',
    app: 'app.[chunkhash].js',
    chunk: '[name].[chunkhash].js'
  }
  ```

Cet exemple change les noms des fichiers fragmentés par avec leur numéro d'identification (`nuxt.config.js`) :

```js
module.exports = {
  build: {
    filenames: {
      chunk: '[id].[chunkhash].js'
    }
  }
}
```

Pour comprendre un peu mieux le rôle du manifeste et des éléments vendeurs, consultez cette [documentation webpack](https://webpack.js.org/guides/code-splitting-libraries/).

## hotMiddleware

- Type : `Object`

Consultez [`webpack-hot-middleware`](https://github.com/glenjamin/webpack-hot-middleware) pour les options disponibles.

## plugins

> Ajouter des plugins webpack

- Type : `Array`
- Par défaut : `[]`

Exemple (`nuxt.config.js`) :

```js
const webpack = require('webpack')

module.exports = {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': require('./package.json').version
      })
    ]
  }
}
```

## postcss

> Personnaliser les plugins [loaders PostCSS](https://github.com/postcss/postcss-loader#usage).

- Type: `Array`, `Object` (recommandé), `Function` ou `Boolean`

  **Note :** alors que l'usage par défaut est OK et assez flexible pour des cas d'utilisations normaux, l'utilisation recommandée par [`vue-loader`](https://vue-loader.vuejs.org/en/options.html#postcss) est d'utiliser un fichier `postcss.config.js` dans votre projet. En créant ce fichier, il sera automatiquement détecté et les options seront ignorées.

- Par défaut :

  ```js
  {
    plugins: {
    'postcss-import' : {},
    'postcss-url': {},
    'postcss-cssnext': {}
    }
  }
  ```

Exemple (`nuxt.config.js`) :

```js
module.exports = {
  build: {
    postcss: {
      plugins: {
      // Désactiver `postcss-url`
      'postcss-url': false

      // Personnaliser les options par défaut de `postcss-cssnext`
      'postcss-cssnext': {
        features: {
          customProperties: false
        }
      }

      // Ajouter divers plugins
      'postcss-nested': {},
      'postcss-responsive-type': {}
      'postcss-hexrgba': {}
      }
    }
  }
}
```

## publicPath

> Nuxt.js vous permet de charger vos fichiers dans `dist` vers un CDN pour des performances maximales, changez simplement `publicPath` pour votre CDN.

- Type: `String`
- Par défaut : `'/_nuxt/'`

Exemple (`nuxt.config.js`) :

```js
module.exports = {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Quand vous lancerez `nuxt build`, le contenu sera directement chargé sur le répertoire `.nuxt/dist/` sur votre CDN !

## ssr

> Creates special webpack bundle for SSR renderer.

- Type : `Boolean`
- Par défaut : `true` for universal mode and `false` for spa mode

Cette option est automatiquement créée en se basant sur la valeur de  `mode` si elle n'est pas fournie.

## templates

> Nuxt.js vous permet de fournir vos propres templates qui seront rendus en se basant sur la configuration de Nuxt. Cette fonctionnalité est particulièrement utile quand utilisée avec [modules](/guide/modules).

- Type : `Array<Object>`

Exemple (`nuxt.config.js`) :

```js
module.exports = {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` peut être absolue ou relatif
        dst: 'support.js', // `dst` est relatif au dossier de `.nuxt`
        options: { // Les options sont fournies au templases par la propriété `options`
          live_chat: false
        }
      }
    ]
  }
}
```

Les templates sont rendus en utilisant [`lodash.template`](https://lodash.com/docs/#template). Vous pouvez en apprendre plus à propos de leur utilisation [ici](https://github.com/learn-co-students/javascript-lodash-templates-v-000).

## vendor

> Nuxt.js vous permet d'ajouter des modules à l'intérieur des fichiers `vendor.bundle.js` pour réduire la taille des paquetages d'application. Cela est particulièrement utile avec l'utilisation de modules externe (comme `axios` par exemple).

- Type: `Array<String>`

Pour ajouter un module / fichier à l'intérieur du paquetage vendeur, ajouter la propriété `build.vendor` à l'intérieur de `nuxt.config.js` :

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

Vous pouvez aussi donner un chemin vers un fichier, comme une bibliothèque personnalisée que vous avez créée :

```js
module.exports = {
  build: {
    vendor: [
      'axios',
      '~/plugins/my-lib.js'
    ]
  }
}
```

## watch

> Vous pouvez fournir des fichiers personnalisés à observer et à régénérer après chaque changement. Cette fonctionnalité est spécialement utile quand elle est utilisée avec [modules](/guide/modules).

- Type: `Array<String>`

```js
module.exports = {
  build: {
    watch: [
      '~/.nuxt/support.js'
    ]
  }
}
```
