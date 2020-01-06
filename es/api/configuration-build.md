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
    analyze: true
    // or
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**INFO:** You can use the command `nuxt build --analyze` or `nuxt build -a` to build your application and launch the bundle analyzer on [http://localhost:8888](http://localhost:8888)

</div>

## babel

- Type: `Object`

> Customize babel configuration for JS and Vue files.

Default:
```js
{
  presets: ['@nuxt/babel-preset-app']
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

## extend

- Type: `Function`

> Extend the webpack configuration manually for the client & server bundles.

The extend is called twice, one time for the server bundle, and one time for the client bundle. The arguments of the method are:

1. Webpack config object
2. Object with the folowing keys (all boolean except `loaders`): `isDev`, `isClient`, `isServer`

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

If you want to see more about our default webpack configuration, take a look at our [webpack directory](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

## filenames

- Type: `Object`

> Customize bundle filenames

- Default:

  ```js
  {
    app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
    video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
  }
  ```

This example changes fancy chunk names to numerical ids (`nuxt.config.js`):

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[id].[contenthash].js'
    }
  }
}
```

To understand a bit more about the use of manifest and vendor, take a look at this [Webpack documentation](https://webpack.js.org/guides/code-splitting-libraries/).

## loaders

- Type: `Array`
  - Items: `Object`

> Customize webpack loaders

Default:
```js
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KO
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KO
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Example (`nuxt.config.js`):
```js
module.exports = {
  build: {
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000, // 10KO
          name: 'img/[name].[hash].[ext]'
        }
      }
    ]
  }
}
```

<div class="Alert Alert--orange">

When the loaders are defined in the `nuxt.config.js`, the default loaders will be overwritten.

</div>

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

- Type: `Array`

> Customize [postcss](https://github.com/postcss/postcss) options

Default:
```js
[
  require('autoprefixer')({
    browsers: ['last 3 versions']
  })
]
```

Example (`nuxt.config.js`):
```js
module.exports = {
  build: {
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ]
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

## quiet

> If you want to run Nuxt build in a quiet mode which suppresses all building logs and warnings, use this config

- Type: `Boolean` or `Object`
- Default: `Boolean(env.ci || env.test)`

By default, quiet mode is enable in CI or test environment.

## vendor

> Nuxt.js lets you add modules inside the `vendor.bundle.js` file generated to reduce the size of the app bundle. It's really useful when using external modules (like `axios` for example)

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
      '~plugins/my-lib.js'
    ]
  }
}
```

## followSymlinks

> By default, the build process does not scan files inside symlinks. This boolean includes them, thus allowing usage of symlinks inside folders such as the "pages" folder, for example. 

- Type: `Boolean`

```js
export default {
  build: {
    followSymlinks: false
  }
}
```
