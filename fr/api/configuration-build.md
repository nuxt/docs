---
title: "API : La propriété build (EN)"
description: Nuxt.js vous permet de personnaliser la configuration webpack pour générer l'application web que vous souhaitez.
---

# La propriété build

> Nuxt.js vous permet de personnaliser la configuration webpack pour générer l'application web que vous souhaitez.

## analyze

> Nuxt.js utilise [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) pour vous permettre de visualiser vos paquetages (« bundles ») et les optimiser.

- Type : `Boolean` ou `Object`
- Par défaut : `false`

Si c'est un objet, consultez les propriétés disponibles [ici](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

Exemple (`nuxt.config.js`) :

```js
export default {
  build: {
    analyze: true,
    // ou
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**Info :** vous pouvez utiliser la commande `nuxt build --analyze` ou `nuxt build -a` pour générer votre application et lancer l'analyse du paquetage sur [http://localhost:8888](http://localhost:8888).

</div>

## babel (EN)

> Personnaliser la configuration Babel pour les fichiers JavaScript et Vue. `.babelrc` est ignoré par défaut.

- Type : `Object` Voir les [options](https://github.com/babel/babel-loader#options) `babel-loader` et les [options](https://babeljs.io/docs/en/options) `babel`
- Default:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

The default targets of [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) are `ie: '9'` in the `client` build, and `node: 'current'` in the `server` build.

### presets (EN)

- Type: `Function`
- Argument:
  1. `Object`: { isServer: true | false }
  2. `Array`:
      - preset name `@nuxt/babel-preset-app`
      - [`options`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options) of `@nuxt/babel-preset-app`

**Note**: The presets configured in `build.babel.presets` will be applied to both, the client and the server build. The target will be set by Nuxt accordingly (client/server). If you want configure the preset differently for the client or the server build, please use `presets` as a function:

> We **highly recommend** to use the default preset instead of below customization

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        // change options directly
        options.targets = isServer ? ... :  ...
        options.corejs = ...
        // return nothing
      }
    }
  }
}
```

Or override default value by returning whole presets list:

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        return [
          [
            preset, {
              buildTarget: isServer ? 'server' : 'client',
              ...options
          }],
          [
            // Other presets
          ]
        ]
      }
    }
  }
}
```

## cache (EN)

- Type: `Boolean`
- Default: `false`
- ⚠️ Experimental

> Enable cache of [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) and [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## crossorigin (EN)

- Type: `String`
- Default: `undefined`

  Configure the `crossorigin` attribute on `<link rel="stylesheet">` and `<script>` tags in generated HTML.

  More Info: [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)

## cssSourceMap

- Type : `boolean`
- Par défaut : `true` en développement et `false` en production.

> Active le support Source Map du CSS

## devMiddleware

- Type : `Object`

Voir [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) pour les options disponibles.

## devtools (EN)

- Type: `boolean`
- Default: `false`

Configure whether to allow [vue-devtools](https://github.com/vuejs/vue-devtools) inspection.

If you already activated through nuxt.config.js or otherwise, devtools enable regardless of the flag.

## extend (EN)

> Étendre la configuration webpack manuellement pour les paquetages client et serveur.

- Type : `Function`

`extend` est appelé deux fois, une fois pour le paquetage serveur et une fois pour le paquetage client. Les arguments de la méthode sont :

1. l'objet de configuration webpack,
2. un objet avec les propriétés suivantes (toutes booléennes sauf `loaders`): `isDev`, `isClient`, `isServer`, `loaders`.


<div class="Alert Alert--orange">

  **Warning:**
  The `isClient` and `isServer` keys provided in are separate from the keys available in [`context`](/api/context).
  They are **not** deprecated. Do not use `process.client` and `process.server` here as they are `undefined` at this point.

</div>

Exemple (`nuxt.config.js`) :

```js
export default {
  build: {
    extend (config, { isClient }) {
      // Étend la configuration webpack uniquement pour le paquetage client
      if (isClient) {
        config.devtool = '#source-map'
      }
    }
  }
}
```

Si vous voulez en savoir plus à propos de notre configuration webpack par défaut, consultez [le répertoire webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

### loaders in extend (EN)

`loaders` has the same object structure as [build.loaders](#loaders), so you can change the options of loaders inside `extend`.

Example (`nuxt.config.js`):

```js
export default {
  build: {
    extend (config, { isClient, loaders: { vue } }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS (EN)

> Activer l'extraction des CSS communs en utilisant [le guide](https://ssr.vuejs.org/en/css.html) de Vue Server Renderer.

- Type : `Boolean`
- Par défaut : `false`

Using [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) under the hood, all your CSS will be extracted into separate files, usually one per component. This allows caching your CSS and JavaScript separately and is worth a try in case you have a lot of global or shared CSS.

<div class="Alert Alert--teal">

**Note:** There was a bug prior to Vue 2.5.18 that removed critical CSS imports when using this options.

</div>

## filenames

> Personnaliser les noms des paquetages.

- Type : `Object`
- Par défaut :

```js
{
  app: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
  chunk: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
  css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
  img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]',
  font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]',
  video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]'
}
```

Cet exemple change les noms des fichiers fragmentés par avec leur numéro d'identification (`nuxt.config.js`) :

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[id].[chunkhash].js'
    }
  }
}
```

Pour comprendre un peu mieux le rôle du manifeste, consultez cette [documentation webpack](https://webpack.js.org/guides/code-splitting/).

## friendlyErrors (EN)

- Type: `Boolean`
- Default: `true` (Overlay enabled)

Enables or disables the overlay provided by [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin)

## hardSource (EN)

- Type: `Boolean`
- Default: `false`
- ⚠️ Experimental

Enables the [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) for improved caching

## hotMiddleware

- Type : `Object`

Consultez [`webpack-hot-middleware`](https://github.com/glenjamin/webpack-hot-middleware) pour les options disponibles.

## html.minify (EN)

- Type: `Object`
- Default:

```js
{
  collapseBooleanAttributes: true,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

**Attention:** If you make changes to `html.minify`, they won't be merged with the defaults!

Configuration for the [html-minifier](https://github.com/kangax/html-minifier) plugin used to minify
HTML files created during the build process (will be applied for *all modes*).

## indicator (EN)

> Display build indicator for hot module replacement in development (available in `v2.8.0+`)
- Type: `Boolean`
- Default: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## loaders (EN)

> Customize options of Nuxt.js integrated webpack loaders.

- Type: `Object`
- Default:

```js
{
  file: {},
  fontUrl: { limit: 1000 },
  imgUrl: { limit: 1000 },
  pugPlain: {},
  vue: {
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      object: 'src',
      embed: 'src'
    }
  },
  css: {},
  cssModules: {
    localIdentName: '[local]_[hash:base64:5]'
  },
  less: {},
  sass: {
    indentedSyntax: true
  },
  scss: {},
  stylus: {},
  ts: {
    transpileOnly: true,
    appendTsSuffixTo: [/\.vue$/]
  },
  tsx: {
    transpileOnly: true,
    appendTsxSuffixTo: [/\.vue$/]
  },
  vueStyle: {}
}
```

> Note: In addition to specifying the configurations in `nuxt.config.js`, it can also be modified by [build.extend](#extend)

### loaders.file

> More details are in [file-loader options](https://github.com/webpack-contrib/file-loader#options).

### loaders.fontUrl and loaders.imgUrl

> More details are in [url-loader options](https://github.com/webpack-contrib/url-loader#options).

### loaders.pugPlain

> More details are in [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) or [Pug compiler options](https://pugjs.org/api/reference.html#options).

### loaders.vue

> More details are in [vue-loader options](https://vue-loader.vuejs.org/options.html).

### loaders.css and loaders.cssModules

> More details are in [css-loader options](https://github.com/webpack-contrib/css-loader#options).
> Note: cssModules is loader options for usage of [CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules)

### loaders.less

> You can pass any Less specific options to the `less-loader` via `loaders.less`. See the [Less documentation](http://lesscss.org/usage/#command-line-usage-options) for all available options in dash-case.

### loaders.sass and loaders.scss

> See the [Node Sass documentation](https://github.com/sass/node-sass/blob/master/README.md#options) for all available Sass options.
> Note: `loaders.sass` is for [Sass Indented Syntax](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)

### loaders.ts

> Loader for typescript file and `lang="ts"` Vue SFC.
> More details are in [ts-loader options](https://github.com/TypeStrong/ts-loader#loader-options).

### loaders.tsx

> More details are in [ts-loader options](https://github.com/TypeStrong/ts-loader#options).

### loaders.vueStyle

> More details are in [vue-style-loader options](https://github.com/vuejs/vue-style-loader#options).

## optimization (EN)

- Type: `Object`
- Default:

  ```js
  {
    minimize: true,
    minimizer: [
      // terser-webpack-plugin
      // optimize-css-assets-webpack-plugin
    ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: undefined,
      cacheGroups: {}
    }
  }
  ```

The default value of `splitChunks.name` is `true` in `dev` or `analyze` mode.

You can set `minimizer` to a customized Array of plugins or set `minimize` to `false` to disable all minimizers.
(`minimize` is being disabled for development by default)

See [Webpack Optimization](https://webpack.js.org/configuration/optimization).

## optimizeCSS (EN)

- Type: `Object` or `Boolean`
- Default:
  - `false`
  - `{}` when extractCSS is enabled

OptimizeCSSAssets plugin options.

See [NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin).

## parallel (EN)

- Type: `Boolean`
- Default: `false`
- ⚠️ Experimental

> Enable [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) in webpack building

## plugins (EN)

> Add webpack plugins

- Type: `Array`
- Default: `[]`

Exemple (`nuxt.config.js`) :

```js
import webpack from 'webpack'
import { version } from './package.json'
export default {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': version
      })
    ]
  }
}
```

## postcss (EN)

> Customize [PostCSS Loader](https://github.com/postcss/postcss-loader#usage) plugins.

- Type: `Array` (legacy, will override defaults), `Object` (recommended), `Function` or `Boolean`

  **Note:** Nuxt.js has applied [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env). By default it enables [Stage 2 features](https://cssdb.org/) and [Autoprefixer](https://github.com/postcss/autoprefixer), you can use `build.postcss.preset` to configure it.

- Default:

  ```js
  {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-preset-env': this.preset,
      'cssnano': { preset: 'default' } // disabled in dev mode
    },
    order: 'presetEnvAndCssnanoLast',
    preset: {
      stage: 2
    }
  }
  ```

Your custom plugin settings will be merged with the default plugins (unless you are using an `Array` instead of an `Object`).

Example (`nuxt.config.js`):

```js
export default {
  build: {
    postcss: {
      plugins: {
          // Disable `postcss-url`
        'postcss-url': false,
        // Add some plugins
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

If the postcss configuration is an `Object`, `order` can be used for defining the plugin order:

- Type: `Array` (ordered plugin names), `String` (order preset name), `Function`
- Default: `cssnanoLast` (put `cssnano` in last)

Example (`nuxt.config.js`):

```js
export default {
  build: {
    postcss: {
      // preset name
      order: 'cssnanoLast',
      // ordered plugin names
      order: ['postcss-import', 'postcss-preset-env', 'cssnano']
      // Function to calculate plugin order
      order: (names, presets) => presets.cssnanoLast(names)
    }
  }
}
```

## profile (EN)

- Type: `Boolean`
- Default: enabled by command line argument `--profile`

> Enable the profiler in [WebpackBar](https://github.com/nuxt/webpackbar#profile)

## publicPath (EN)

> Nuxt.js lets you upload your dist files to your CDN for maximum performances, simply set the `publicPath` to your CDN.

- Type: `String`
- Default: `'/_nuxt/'`

Example (`nuxt.config.js`):

```js
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Then, when launching `nuxt build`, upload the content of `.nuxt/dist/client` directory to your CDN and voilà!

## quiet (EN)

> Suppresses most of the build output log

- Type: `Boolean`
- Default: Enabled when a `CI` or `test` environment is detected by [std-env](https://github.com/blindmedia/std-env)

## splitChunks (EN)

- Type: `Object`
- Default:

  ```js
  {
    layouts: false,
    pages: true,
    commons: true
  }
  ```

If split codes for `layout`, `pages` and `commons` (common libs: vue|vue-loader|vue-router|vuex...).


## ssr (EN)

> Creates special webpack bundle for SSR renderer.

- Type: `Boolean`
- Default: `true` for universal mode and `false` for spa mode

This option is automatically set based on `mode` value if not provided.

## styleResources (EN)

- Type : `Object`
- Par défaut : `{}`

<div class="Alert Alert--orange">

**Warning:** This property is deprecated. Please use the [style-resources-module](https://github.com/nuxt-community/style-resources-module/) instead for improved performance and better DX!

</div>

Ceci est utile quand vous avez besoin d'injecter diverses variables et mixins dans vos pages sans avoir à les importer à chaque fois.

Nuxt.js utilise https://github.com/yenshih/style-resources-loader pour accomplir cette tâche.

Vous devez spécifier un motif/chemin souhaitez pour inclure les préprocesseurs : `less`, `sass`, `scss` ou `stylus`.

Vous ne pouvez pas utiliser les aliases de chemin (`~` et `@`) ici, vous devez utiliser des chemins relatifs ou absolues.

`nuxt.config.js`:

```js
{
  build: {
    styleResources: {
      scss: './assets/variables.scss',
      less: './assets/*.less',
      // sass: ...,
      // scss: ...
      options: {
        // See https://github.com/yenshih/style-resources-loader#options
        // Except `patterns` property
      }
    }
  }
}
```

## templates (EN)

> Nuxt.js allows you provide your own templates which will be rendered based on Nuxt configuration. This feature is specially useful for using with [modules](/guide/modules).

- Type: `Array`

Example (`nuxt.config.js`):

```js
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` can be absolute or relative
        dst: 'support.js', // `dst` is relative to project `.nuxt` dir
        options: { // Options are provided to template as `options` key
          live_chat: false
        }
      }
    ]
  }
}
```

Templates are rendered using [`lodash.template`](https://lodash.com/docs/#template) you can learn more about using them [here](https://github.com/learn-co-students/javascript-lodash-templates-v-000).

## terser (EN)

- Type: `Object` or `Boolean`
- Default:

```js
{
  parallel: true,
  cache: false,
  sourceMap: false,
  extractComments: {
    filename: 'LICENSES'
  },
  terserOptions: {
    output: {
      comments: /^\**!|@preserve|@license|@cc_on/
    }
  }
}
```

Terser plugin options. Set to `false` to disable this plugin.

`sourceMap` will be enabled when webpack `config.devtool` matches `source-?map`

See [webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin).

## transpile

- Type: `Array<string | RegExp>`
- Par défaut : `[]`

Si vous voulez transpiler des dépendances spécifiques avec Babel, vous pouvez les ajouter dans `build.transpile`. Les éléments pour la transpilation peuvent être des chaines de caractères ou des expressions régulières pour concorder avec le nom des fichiers.

## typescript (EN)

> Customize Nuxt.js TypeScript support.

<div class="Alert Alert--blue">

**Important**: This property will be ignored if [`TypeScript Support`](/guide/typescript) hasn't be set up in your project.

</div>

- Type: `Object`
- Default:

  ```js
  {
    typeCheck: true,
    ignoreNotFoundWarnings: false
  }
  ```

### typescript.typeCheck

> Enables TypeScript type checking on a separate process.

- Type: `Boolean` or `Object`
- Default: `true`

When enabled, Nuxt.js uses [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin) to provide type checking.

You can use an `Object` to override plugin options or set it to `false` to disable it.

### typescript.ignoreNotFoundWarnings

> Enables suppress not found typescript warnings.

- Type: `Boolean`
- Default: `false`

When enabled, you can suppress `export ... was not found ...` warnings.

See also about background information [https://github.com/TypeStrong/ts-loader/issues/653](https://github.com/TypeStrong/ts-loader/issues/653)

**Warning:** This property might suppress the warnings you want to see. Be careful with how you configure it.

## vueLoader (EN)

> Note: This config has been removed since Nuxt 2.0, please use [`build.loaders.vue`](#loaders)instead.

- Type: `Object`
- Par défaut :

  ```js
  {
    productionMode: !this.options.dev,
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      object: 'src',
      embed: 'src'
    }
  }
  ```

> Specify the [Vue Loader Options](https://vue-loader.vuejs.org/options.html).

## watch (EN)

> You can provide your custom files to watch and regenerate after changes. This feature is specially useful for using with [modules](/guide/modules).

- Type: `Array<String>`

```js
export default {
  build: {
    watch: [
      '~/.nuxt/support.js'
    ]
  }
}
```

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
