---
title: "API: The build Property"
description: Nuxt.js lets you customize the webpack configuration for building your web application as you want.
---

# The build Property

> Nuxt.js lets you customize the webpack configuration for building your web application as you want.

## analyze

> Nuxt.js use [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) to let you visualize your bundles and how to optimize them.

- Type: `Boolean` or `Object`
- Default: `false`

If an object, see available properties [here](https://github.com/th0r/webpack-bundle-analyzer#as-plugin).

Example (`nuxt.config.js`):
```js
module.exports = {
  build: {
    analyze: true,
    // or
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<p class="Alert Alert--teal">**INFO:** You can use the command `nuxt build --analyze` or `nuxt build -a` to build your application and launch the bundle analyzer on [http://localhost:8888](http://localhost:8888)</p>

## babel

- Type: `Object`

> Customize babel configuration for JS and Vue files.

Default:
```js
{
  presets: ['vue-app']
}
```

Example (`nuxt.config.js`):
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

- Type: `boolean`
  - Default: `true` for dev and `false` for production.

> Enables CSS Source Map support

## devMiddleware
- Type: `Object`

See [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) for available options.

## extend

- Type: `Function`

> Extend the webpack configuration manually for the client & server bundles.

The extend is called twice, one time for the server bundle, and one time for the client bundle. The arguments of the method are:

1. Webpack config object
2. Object with the folowing keys (all boolean): `dev`, `isClient`, `isServer`

Example (`nuxt.config.js`):
```js
module.exports = {
  build: {
    extend (config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
```

If you want to see more about our default webpack configuration, take a look at our [webpack directory](https://github.com/nuxt/nuxt.js/tree/master/lib/webpack).

## extractCSS

- Type: `Boolean`
  - Default: `false`

> Enables Common CSS Extraction using vue SSR [guidelines](https://ssr.vuejs.org/en/css.html).

Using extract-text-webpack-plugin to extract the CSS in the main chunk into a separate CSS file (auto injected with template),
which allows the file to be individually cached. This is recommended when there is a lot of shared CSS.
CSS inside async components will remain inlined as JavaScript strings and handled by vue-style-loader.

## filenames

- Type: `Object`

> Customize bundle filenames

Default:
```js
{
  css: 'common.[contenthash].css',
  manifest: 'manifest.[hash].js',
  vendor: 'common.[chunkhash].js',
  app: 'app.[chunkhash].js',
  chunk: '[name].[chunkhash].js'
}
```

This example changes fancy chunk names to numerical ids (`nuxt.config.js`):

```js
module.exports = {
  build: {
    filenames: {
      chunk: '[id].[chunkhash].js'
    }
  }
}
```

To understand a bit more about the use of manifest and vendor, take a look at this [Webpack documentation](https://webpack.js.org/guides/code-splitting-libraries/).

## hotMiddleware
- Type: `Object`

See [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) for available options.

## plugins

- Type: `Array`
- Default: `[]`

> Add Webpack plugins

Example (`nuxt.config.js`):
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

- Type: `Array` or `Object` (recommended) or `Function` or `Boolean`

> Customize [Postcss Loader](https://github.com/postcss/postcss-loader#usage) plugins.

**NOTE:** While default preset is OK and flexible enough for normal use cases, the recommended 
usage by [vue-loader](https://vue-loader.vuejs.org/en/options.html#postcss) is using `postcss.config.js` file in your project.
By creating that file it will be automatically detected and this option is ignored.

Default:

```js
{
  plugins: {
  'postcss-import' : {},
  'postcss-url': {},
  'postcss-cssnext': {}
  }
}
```

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
    postcss: {
      plugins: {
        // Disable postcss-url
      'postcss-url': false

      // Customize postcss-cssnext default options
      'postcss-cssnext': {
        features: {
          customProperties: false
        }
      }

      // Add some plugins
      'postcss-nested': {},
      'postcss-responsive-type': {}
      'postcss-hexrgba': {}
      }
    }
  }
}
```

## publicPath

- Type: `String`
- Default: `'/_nuxt/'`

> Nuxt.js lets you upload your dist files to your CDN for maximum performances, simply set the `publicPath` to your CDN.

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Then, when launching `nuxt build`, upload the content of `.nuxt/dist/` directory to your CDN and voilà!

## ssr
- Type: `Boolean`
  - Default `true` for universal mode and `false` for spa mode

> Creates special webpack bundle for SSR renderer.

This option is automatically set based on `mode` value if not provided. 

## templates
- Type: `Array`
 - Items: `Object`

> Nuxt.js allows you provide your own templates which will be rendered based on nuxt configuration
  This feature is specially useful for using with [modules](/guide/modules).

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
      templates: [
         {
           src: '~/modules/support/plugin.js', // src can be absolute or relative
           dst: 'support.js', // dst is relative to project `.nuxt` dir
           options: { // Options are provided to template as `options` key
               live_chat: false
           }
         }
      ]
  }
}
```

Templates are rendered using [lodash.template](https://lodash.com/docs/#template) 
you can learn more about using them [here](https://github.com/learn-co-students/javascript-lodash-templates-v-000).

## vendor

> Nuxt.js lets you add modules inside the `vendor.bundle.js` file to reduce the size of the application bundle. This is especially helpful when using external modules (like `axios` for example).

- Type: `Array`
 - Items: `String`

To add a module/file inside the vendor bundle, add the `build.vendor` key inside `nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

You can also give a path to a file, like a custom lib you created:
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
- Type: `Array`
 - Items: `String`

> You can provide your custom files to watch and regenerate after changes.
  This feature is specially useful for using with [modules](/guide/modules).

```js
module.exports = {
  build: {
      watch: [
          '~/.nuxt/support.js'
      ]
  }
}
```
