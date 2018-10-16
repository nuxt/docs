---
title: "API: 构建配置"
description: Nuxt.js 允许你根据服务端需求，自定义 webpack 的构建配置。
---

# 构建配置

> Nuxt.js 允许你根据服务端需求，自定义 webpack 的构建配置。

## analyze

> Nuxt.js 使用 [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) 分析并可视化构建后的打包文件，你可以基于分析结果来决定如何优化它。

- 类型： `Boolean` 或 `Object`
- 默认值： `false`

如果是 `Object` 类型， 可以移步 [这里](https://github.com/th0r/webpack-bundle-analyzer#as-plugin) 查看可用的属性。

例如 (`nuxt.config.js`):
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

<p class="Alert Alert--teal">**提示：** 可通过 `nuxt build --analyze` 或 `nuxt build -a` 命令来启用该分析器进行编译构建，分析结果可在 [http://localhost:8888](http://localhost:8888) 上查看。</p>

## babel

- 类型： `Object`

> 为 JS 和 Vue 文件设定自定义的 babel 配置。

默认值：
```js
{
  presets: ['vue-app']
}
```

例如 (`nuxt.config.js`)：
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

- 类型： `Function`

> 为客户端和服务端的构建配置进行手工的扩展处理。

该扩展方法会被调用两次，一次在服务端打包构建的时候，另外一次是在客户端打包构建的时候。该方法的参数如下：
1. Webpack 配置对象
2. 构建环境对象，包括这些属性（全部为布尔类型）： `isDev`， `isClient`， `isServer`

例如 (`nuxt.config.js`)：
```js
module.exports = {
  build: {
    extend (config, { isClient }) {
      // 为 客户端打包 进行扩展配置
      if (isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
```

如果你想了解更多关于webpack的配置，可以移步 Nuxt.js 源码的 [webpack 目录](https://github.com/nuxt/nuxt.js/tree/master/lib/builder/webpack)。

## filenames

- 类型： `Object`

> 自定义打包文件名

默认值：
```js
{
  vendor: 'vendor.bundle.[hash].js',
  app: 'nuxt.bundle.[chunkhash].js'
}
```

例如 (`nuxt.config.js`)：
```js
module.exports = {
  build: {
    filenames: {
      vendor: 'vendor.[hash].js',
      app: 'app.[chunkhash].js'
    }
  }
}
```

## loaders

- 类型： `Array`
  - 数组元素类型： `Object`

> 自定义 webpack 加载器

默认值：
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

例如 (`nuxt.config.js`)：
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

<p class="Alert Alert--orange">当 `nuxt.config.js` 里有自定义的 loaders 配置时，将会覆盖默认的配置。</p>

## plugins

- 类型： `Array`
- 默认值： `[]`

> 配置 Webpack 插件

例如 (`nuxt.config.js`):
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

- 类型： `Array`

> 自定义 [postcss](https://github.com/postcss/postcss) 配置

默认值：
```js
[
  require('autoprefixer')({
    browsers: ['last 3 versions']
  })
]
```

例如 (`nuxt.config.js`)：
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

- 类型: `String`
- 默认值: `'/_nuxt/'`

> Nuxt.js 允许你将待发布的文件直接上传至 CDN 以获得最佳访问性能，只需设置 `publicPath` 为你的 CDN 地址即可。

例如 (`nuxt.config.js`):

```js
module.exports = {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

通过以上配置，当运行 `nuxt build` 时，再将`.nuxt/dist/`目录的内容上传到您的CDN，然后瞧！

## vendor

> Nuxt.js 允许你在自动生成的 `vendor.bundle.js` 文件中添加一些模块，以减少应用 bundle 的体积。这里说的是一些你所依赖的第三方模块 (比如 `axios`)

- 类型： `Array`
 - 数组元素类型： `String`

想要把模块打包进 vendor bundle，你可以在 `nuxt.config.js` 的 `build.vendor` 字段中配置：

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

你也可以配置文件路径，比如一些自己写的库:

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
