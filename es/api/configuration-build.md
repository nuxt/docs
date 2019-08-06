---
title: "API: La Propiedad build"
description: Nuxt.js le permite personalizar la configuración de webpack para crear su aplicación web como desee.
---

# La Propiedad build

> Nuxt.js le permite personalizar la configuración de webpack para crear su aplicación web como desee.

## analyze

> Nuxt.js usa [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) para permitirle visualizar sus paquetes y cómo optimizarlos.

- Tipo: `Boolean` o `Object`
- Defecto: `false`

Si es un objeto, vea las propiedades disponibles [aqui](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

Ejemplo (`nuxt.config.js`):

```js
export default {
  build: {
    analyze: true,
    // or
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**Info:** usted puede usar el comando `nuxt build --analyze` or `nuxt build -a` para construir tu aplicacion y lanzar el bundle analyzer en [http://localhost:8888](http://localhost:8888).

</div>

## babel

> Personalice la configuración de Babel para archivos JavaScript y Vue. `.babelrc` se ignora por defecto.

- Tipo: `Object` Vea `babel-loader` [options](https://github.com/babel/babel-loader#options) y `babel` [options](https://babeljs.io/docs/en/options)
- Defecto:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

El targets por defecto es [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) son `ie: '9'` en la construccion del `cliente` , y `node: 'current'` en la construccion del `servidor`.

### presets

- Tipo: `Function`
- Argumento:
  1. `Object`: { isServer: true | false }
  2. `Array`:
      - nombre del preset `@nuxt/babel-preset-app`
      - [`options`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options) de `@nuxt/babel-preset-app`

**Note**: El presets configurado en `build.babel.presets` va ser aplicado para ambos, la construccion del cliente y del servidor. El target va ser asignado acorde a Nuxt (client/server). Si tu quieres configurar el preset diferente para la construccion del servidor y del cliente, por favor use `presets` como una funcion:

> Nosotros **recomendamos altamente** usar el preset por defecto en vez de uno personalizado.

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

O reemplazar el valor por defecto devolviendo toda la lista de presets:

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

## cache

- Tipo: `Boolean`
- Defecto: `false`
- ⚠️ Experimental

> Activa el cache de [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) y [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## crossorigin

- Tipo: `String`
- Defecto: `undefined`

  Configura el atributo `crossorigin` en los tags `<link rel="stylesheet">` y `<script>` en el HTML generado.

  Más informacion: [Configuracion de atributos CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)

## cssSourceMap

- Tipo: `boolean`
- Defecto: `true` para dev y `false` para produccion.

> Activa el soporte de CSS Source Map

## devMiddleware

- Tipo: `Object`

Vea [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) para las opciones disponibles.

## devtools

- Tipo: `boolean`
- Defecto: `false`

Configure si desea permitir la inspeccion con [vue-devtools](https://github.com/vuejs/vue-devtools).

Si ya se activó a través de nuxt.config.js o de otro modo, devtools se activará independientemente de la variable.

## extend

> Extienda la configuración del paquete web manualmente para los paquetes de cliente y servidor.

- Tipo: `Function`

La extensión se llama dos veces, una vez para el paquete del servidor y una vez para el paquete del cliente. Los argumentos del método son:

1. El objecto de configuracion de Webpack,
2. Un objecto que sigue las claves (todos son booleanos excepto `loaders`): `isDev`, `isClient`, `isServer`, `loaders`.


<div class="Alert Alert--orange">

  **Advertencia:**
  Las claves `isClient` y `isServer` proporcionadas en son independientes de las claves disponibles en [`context`](/api/context).
  **No** son obsoletos. No utilice `process.client` y` process.server` aquí ya que están `undefined` en este momento.
  
</div>


Ejemplo (`nuxt.config.js`):

```js
export default {
  build: {
    extend (config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = '#source-map'
      }
    }
  }
}
```

Si desea ver más sobre nuestra configuración predeterminada de webpack, eche un vistazo a nuestro [directorio de webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

### loaders en extend

`loaders` tienen la misma estructura de objetio como [build.loaders](#loaders), asi que usted puede cambiar la opcion de los loaders adentro de `extend`.

Ejemplo (`nuxt.config.js`):

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

## extractCSS

> Activa el Common CSS Extraction usando Vue Server Renderer [guidelines](https://ssr.vuejs.org/en/css.html).

- Tipo: `Boolean`
- Defecto: `false`

Usando [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) bajo la capa, todos tus CSS van a ser extraido en archivos separados, usualmente uno por cada componente. Esto permite el cacheo de tus CSS y JavaScript separadamente y vale la pena intentarlo en caso tenga mucho CSS global o compartido.

<div class="Alert Alert--teal">

**Nota:** Aqui habia un error prioritario para Vue 2.5.18 que eliminaba la importacion del CSS critico cuando usabas estas opciones.

</div>


## filenames

> Customiza los nombres de los bundle.

- Tipo: `Object`
- Defecto:

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

Por ejemplo hacemos un ligero cambio a los nombres de los chunks a ids numericos (`nuxt.config.js`):

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[id].[chunkhash].js'
    }
  }
}
```

Para entender un poco más sobre el uso de manifests, eche un vistazo a esto [documentacion de webpack](https://webpack.js.org/guides/code-splitting/).

## friendlyErrors

- Tipo: `Boolean`
- Defecto: `true` (Overlay activada)

Habilita o deshabilita el overlay proporcionado por [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin)

## hardSource

- Tipo: `Boolean`
- Defecto: `false`
- ⚠️ Experimental

Activa el [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) para mejorar el cacheo

## hotMiddleware

- Tipo: `Object`

Vea [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) para las opciones disponibles.

## html.minify

- Tipo: `Object`
- Defecto:

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

**Atencion:** Si usted hacer cambio a `html.minify`, esto no va ser fusionado con los valores predeterminados!

Configuracion para el plugin [html-minifier](https://github.com/kangax/html-minifier) usado para minificar
Los archivos HTML creados durante el proceso de creacion (van a ser aplicados para *todos los modos*).

## indicator

> Muestra un indicador de creacion para el hot module replacement en desarrollo (disponible en `v2.8.0+`)

- Tipo: `Boolean`
- Defecto: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## loaders

> Customiza la opcion de los loaders de Webpack integrado en Nuxt.js

- Tipo: `Object`
- Defecto:

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

> Nota: Además de especificar las configuraciones en `nuxt.config.js`, también puede ser modificado por [build.extend](#extend)

### loaders.file

> Más detalles en [opciones de file-loader](https://github.com/webpack-contrib/file-loader#options).

### loaders.fontUrl and loaders.imgUrl

> Más detalles en [opciones de url-loader](https://github.com/webpack-contrib/url-loader#options).

### loaders.pugPlain

>  Más detalles en [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) or [opciones de Pug compiler](https://pugjs.org/api/reference.html#options).

### loaders.vue

> Más detalles en [opciones de vue-loader](https://vue-loader.vuejs.org/options.html).

### loaders.css y loaders.cssModules

> Más detalles en [opciones de css-loader](https://github.com/webpack-contrib/css-loader#options).
> Nota: cssModules es la opcion del loader para el uso de [CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules)

### loaders.less

> Puede pasar cualquier opción específica a `less-loader` via `loaders.less`. Vea [documentacion de Less](http://lesscss.org/usage/#command-line-usage-options) para toda las opciones disponible en dash-case.

### loaders.sass and loaders.scss

> Vea la [documentacion de Node Sass](https://github.com/sass/node-sass/blob/master/README.md#options) para todas las opciones disponible de Sass.
> Nota: `loaders.sass` es para [Sass Indented Syntax](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)

### loaders.ts

> Loader para archivos typescript y `lang="ts"` Vue SFC.
> Más detalles en [opciones de ts-loader](https://github.com/TypeStrong/ts-loader#loader-options).

### loaders.tsx

> Más detalles en [opciones de ts-loader](https://github.com/TypeStrong/ts-loader#options).

### loaders.vueStyle

> Más detalles en [opciones de vue-style-loader](https://github.com/vuejs/vue-style-loader#options).

## optimization

- Tipo: `Object`
- Defecto:

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

El valor por defecto de `splitChunks.name` es `true` in `dev` or `analyze` mode.

You can set `minimizer` to a customized Array of plugins or set `minimize` to `false` to disable all minimizers.
(`minimize` is being disabled for development by default)

See [Webpack Optimization](https://webpack.js.org/configuration/optimization).

## optimizeCSS

- Type: `Object` or `Boolean`
- Default:
  - `false`
  - `{}` when extractCSS is enabled

OptimizeCSSAssets plugin options.

See [NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin).

## parallel

- Type: `Boolean`
- Default: `false`
- ⚠️ Experimental

> Enable [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) in webpack building

## plugins

> Add webpack plugins

- Type: `Array`
- Default: `[]`

Example (`nuxt.config.js`):

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

## postcss

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

## profile

- Type: `Boolean`
- Default: enabled by command line argument `--profile`

> Enable the profiler in [WebpackBar](https://github.com/nuxt/webpackbar#profile)

## publicPath

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

## quiet

> Suppresses most of the build output log

- Type: `Boolean`
- Default: Enabled when a `CI` or `test` environment is detected by [std-env](https://github.com/blindmedia/std-env)

## splitChunks

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


## ssr

> Creates special webpack bundle for SSR renderer.

- Type: `Boolean`
- Default: `true` for universal mode and `false` for spa mode

This option is automatically set based on `mode` value if not provided.

## styleResources

- Type: `Object`
- Default: `{}`

<div class="Alert Alert--orange">

**Warning:** This property is deprecated. Please use the [style-resources-module](https://github.com/nuxt-community/style-resources-module/) instead for improved performance and better DX!

</div>

This is useful when you need to inject some variables and mixins in your pages without having to import them every time.

Nuxt.js uses https://github.com/yenshih/style-resources-loader to achieve this behaviour.

You need to specify the patterns/path you want to include for the given pre-processors: `less`, `sass`, `scss` or `stylus`

You cannot use path aliases here (`~` and `@`), you need to use relative or absolute paths.

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

## templates

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

## terser

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
- Default: `[]`

If you want to transpile specific dependencies with Babel, you can add them in `build.transpile`. Each item in transpile can be a package name, or a string or regex object matching the dependency's file name.

## typescript

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

## vueLoader

> Note: This config has been removed since Nuxt 2.0, please use [`build.loaders.vue`](#loaders)instead.

- Type: `Object`
- Default:

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

## watch

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
