---
title: Loading audio files from assets directory (EN)
description: How to extend Webpack config to load audio files?
---

#  How to extend Webpack config to load audio files? (EN)

Audio files should be processed by `file-loader`. This loader is already included in the default Webpack configuration, but it is not set up to handle audio files. You need to extend its default configuration in `nuxt.config.js`:

```js
export default {
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  }
}
```

You can now import audio files like this `<audio :src="require('@/assets/water.mp3')" controls></audio>`.

If you only want to write: `<audio src="@/assets/water.mp3" controls></audio>`, you need to tell `vue-loader` to automatically require your audio files when you reference them with the `src` attribute:

```js
export default {
   build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src',
        },
      },
    },

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },
}
```

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
