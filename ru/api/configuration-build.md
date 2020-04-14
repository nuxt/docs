---
title: "API: Свойство build"
description: Nuxt.js позволяет менять конфигурацию webpack для создания веб-приложений так, как вы хотите.
---

> Nuxt.js позволяет менять конфигурацию webpack для создания веб-приложений так, как вы хотите.

## analyze

> Nuxt.js использует библиотеку [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) для того, что бы предоставить возможность визуализации бандлов и возможностей их оптимизации.

- Тип: `Boolean` или `Object`
- Значение по умолчанию: `false`

Допустимые свойства для передаваемого объекта можно посмотреть [здесь](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    analyze: true,
    // или
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**Информация:** можно использовать команду `yarn nuxt build --analyze` или `yarn nuxt build -a` для сборки приложения и запуска анализатора бандла по адресу [http://localhost:8888](http://localhost:8888). Если вы не используете `yarn`, то эту команду можно запустить с помощью `npx`.

</div>

## babel

> Настройте конфигурацию Babel для файлов Javascript и Vue. `.babelrc` по умолчанию игнорируется.

- Тип: `Object` Смотрите опции для [`babel-loader`](https://github.com/babel/babel-loader#options) и [`babel`](https://babeljs.io/docs/en/options)
- Значение по умолчанию:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

По умолчанию целями для [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) являются `ie: '9'` для сборки `client`, и `node: 'current'` для сборки `server`.

### presets

- Тип: `Function`
- Значение:
  1. `Object`: { isServer: true | false }
  2. `Array`:
      - название предустановленного набора настроек `@nuxt/babel-preset-app`
      - [`опции`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options) пакета `@nuxt/babel-preset-app`

**Заметка**: предустановленный набор настроек, указанный в `build.babel.presets` будет применен к обеим сборкам, как клиентской, так и серверной. Цель сборки будет установлена фреймворком Nuxt соответственно (клиент/сервер). Если вы хотите использовать разные наборы предустановленных настроек для клиента и сервера, то используйте `presets` как функцию:

> Мы **крайне рекомендуем** использовать набор по умолчанию, а не настройку, указанную ниже

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        // Меняем опции напрямую
        options.targets = isServer ? ... :  ...
        options.corejs = ...
        // Ничего не возвращаем
      }
    }
  }
}
```

Или замените значение по умолчанию вернув целый список настроек:

```js
export default {
  build: {
    babel: {
      presets ({ isServer }, [ preset, options ]) {
        return [
          [
            preset, {
              buildTarget: isServer ? 'server' : 'client',
              ...options
            }],
          [
            // Остальные настройки
          ]
        ]
      }
    }
  }
}
```

## cache

- Тип: `Boolean`
- Значение по умолчанию: `false`
- ⚠️ Экспериментальная настройка

> Включает кэширование для [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) и [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## crossorigin

- Тип: `String`
- Значение по умолчанию: `undefined`

  Настройка атрибута `crossorigin` для тегов `<link rel="stylesheet">` и `<script>` в сгенерированном HTML.

  Больше информации: [настройки атрибутов CORS](https://developer.mozilla.org/ru/docs/Web/HTML/CORS_settings_attributes)

## cssSourceMap

- Тип: `boolean`
- Значение по умолчанию: `true` для dev и `false` для production.

> Включает карту исходного кода для CSS

## devMiddleware

- Тип: `Object`

Доступные опции можно посмотреть здесь: [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware).

Смотрите [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) на предмет доступных опций.

## devtools

- Тип: `boolean`
- Значение по умолчанию: `false`

Настройка, которая позволяет разрешить или запретить инспекцию с помощью [vue-devtools](https://github.com/vuejs/vue-devtools).

Если инструменты разработчика были активированы каким-то образом помимо этой настройки, то этот флаг будет проигнорирован.

## extend

> Расширение конфигурации webpack вручную для клиентской и серверной сборок.

- Тип: `Function`

Функция `extend` вызывается дважды: один раз для серверной сборки, второй раз для клиентской. Аргументами данной функции являются:

1. Объект конфигурации Webpack,
2. Объект со следующими свойствами (все булевы, кроме `loaders`): `isDev`, `isClient`, `isServer`, `loaders`.


<div class="Alert Alert--orange">

  **Внимание:**
  Предоставленные ключи `isClient` и `isServer` отличаются от ключей с таким же названием, которые присутствуют в контексте([`context`](/api/context)).
  Они **не считаются** устаревшими. Не используйте `process.client` и `process.server` в этой функции, так как на данный момент они всё ещё будут `undefined`.

</div>


Пример (`nuxt.config.js`):

```js
export default {
  build: {
    extend (config, { isClient }) {
      // Расширение конфигурации Webpack только для клиента
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
```

Если вы хотите узнать больше о нашей стандартной конфигурации Webpack, то посмотрите на нашу [директорию webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

### загрузчики (loaders) в extend

`loaders` (загрузчики) имеет такую же структуру объекта, как и [build.loaders](#loaders), поэтому можно поменять настройки загрузчиков прямо в `extend`.

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    extend (config, { isClient, loaders: { vue } }) {
      // Расширение конфигурации Webpack только для клиента
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> Включает извлечение общего CSS согласно [инструкциям](https://ssr.vuejs.org/en/css.html) Vue Server Renderer.

- Тип: `Boolean`
- Значение по умолчанию: `false`

За счёт использования внутри [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/), весь ваш CSS будет извлечён в отдельные файлы, обычно по одному на компонент. Такое поведение позволяет отдельно кэшировать CSS и JS. Имеет смысл попробовать данную настройку, если у вас много глобального или общего CSS.

<div class="Alert Alert--teal">

**Информация:** Во Vue до версии 2.5.18 существовал баг, который удалял критически важные импорты CSS при использовании этой настройки.

</div>

Возможно, вы захотите извлечь весь CSS в отдельный файл.
Для этого есть отдельный подход:

<div class="Alert Alert--orange">
⚠️ Не рекомендуется извлекать все стили в один файл. 
Извлечение в отдельные файлы лучше для кэширования и предварительной загрузки. 
Так же это может улучшить производительность страницы за счет загрузки только необходимых ресурсов.
</div>

```js
export default {
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
```

## filenames

> Настройка имен файлов для бандлов.

- Тип: `Object`
- Значение по умолчанию:

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

Этот пример заменяет красивые имена файлов на числовые идентификаторы (`nuxt.config.js`):

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[id].[contenthash].js'
    }
  }
}
```
Для того, что бы лучше разобраться с использованием манифестов, можно посмотреть на [документацию webpack]https://webpack.js.org/guides/code-splitting/).

## friendlyErrors

- Тип: `Boolean`
- Значение по умолчанию: `true` (Оверлей включен)

Включает или выключает оверлей, предоставляемый плагином [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin).

## hardSource

- Тип: `Boolean`
- Значение по умолчанию: `false`
- ⚠️ Экспериментальная настройка

Включает плагин [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) для улучшенного кэширования.

## hotMiddleware

- Тип: `Object`

Доступные опции описаны в документации [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware).

## html.minify

- Тип: `Object`
- Значение по умолчанию:

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

**Внимание:** Изменения, которые вы вносите в `html.minify`, не будут объединены со значениями по умолчанию!

Настройки для плагина [html-minifier](https://github.com/kangax/html-minifier), который используется для минимизации
HTML файлов, созданных в процессе сборки (это применимо ко *всем режимам*).

## indicator

> Отобразить индикатор сборки для горячей подмены модулей во время разработки (доступно начиная с версии `v2.8.0+`)
- Тип: `Boolean`
- Значение по умолчанию: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## loaders

> Настройки опций для загрузчиков, которые есть в Nuxt.js по умолчанию.

- Тип: `Object`
- Значение по умолчанию:

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
  vueStyle: {}
}
```

> Обратите внимание: Помимо изменения настроек напрямую в `nuxt.config.js`, они так же могут быть изменены в [build.extend](#extend)

### loaders.file

> Больше информации в [опциях file-loader](https://github.com/webpack-contrib/file-loader#options).

### loaders.fontUrl and loaders.imgUrl

> Больше информации в [опциях url-loader](https://github.com/webpack-contrib/url-loader#options).

### loaders.pugPlain

> Больше информации в [опциях pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) или [опциях Pug compiler](https://pugjs.org/api/reference.html#options).

### loaders.vue

> Больше информации в [опциях vue-loader](https://vue-loader.vuejs.org/options.html).

### loaders.css and loaders.cssModules

> Больше информации в [опциях css-loader](https://github.com/webpack-contrib/css-loader#options).
> Информация: cssModules это опции для использования [Модулей CSS](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules)

### loaders.less

> Можно передавать дополнительные опции для `less-loader` через `loaders.less`. Доступны все опции для командной строки (которые начинаются с `-`), которые описаны в [документации Less](http://lesscss.org/usage/#command-line-usage-options).

### loaders.sass and loaders.scss

> Смотрите [документацию Node Sass](https://github.com/sass/node-sass/blob/master/README.md#options) на предмет всех доступных опций.
> Информация: `loaders.sass` - это загрузчик для [синтаксиса Sass, построенного на отступах](https://sass-lang.com/documentation/syntax#the-indented-syntax)

### loaders.vueStyle

> Больше информации в [vue-style-loader](https://github.com/vuejs/vue-style-loader#options).

## optimization

- Тип: `Object`
- Значение по умолчанию:

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

Значением по умолчанию для `splitChunks.name` является `true` в режимах `dev` или `analyze`.

Вы можете задать значением `minimizer` массив плагинов, или присвоить `minimize` значение `false`, чтобы отключить
любые минификаторы. (`minimize` отключено по умолчанию в режиме разработки)

Подробнее об [оптимизации Webpack](https://webpack.js.org/configuration/optimization).

## optimizeCSS

- Тип: `Object` or `Boolean`
- Значение по умолчанию:
  - `false`
  - `{}` когда включен `extractCSS`

Опции для плагина OptimizeCSSAssets.

Подробнее: [NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin).

## parallel

- Тип: `Boolean`
- Значение по умолчанию: `false`
- ⚠️ Экспериментальная настройка

> Включение [потокового загрузчика (thread-loader)](https://github.com/webpack-contrib/thread-loader#thread-loader) при сборке webpack

## plugins

> Добавление плагинов webpack

- Тип: `Array`
- Значение по умолчанию: `[]`

Пример (`nuxt.config.js`):

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

> Изменение плагинов для [загрузчика PostCSS Loader](https://github.com/postcss/postcss-loader#usage).

- Тип: `Array` (устарело, полностью заменяет значения по умолчанию), `Object` (рекомендовано), `Function` or `Boolean`

  **Заметка:** Nuxt.js применяет [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env). По умолчанию это включает [возможности  из Stage 2](https://cssdb.org/) и [Autoprefixer](https://github.com/postcss/autoprefixer). Можно использовать `build.postcss.preset` для настроек.

- Значение по умолчанию:

  ```js
  {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-preset-env': this.preset,
      'cssnano': { preset: 'default' } // выключено в режиме разработки
    },
    order: 'presetEnvAndCssnanoLast',
    preset: {
      stage: 2
    }
  }
  ```

Ваши настройки плагинов будут объединены с настройками по умолчанию (только если вы не используете массив вместо объекта).

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    postcss: {
      plugins: {
        // Отключаем `postcss-url`
        'postcss-url': false,
        // Добавляем дополнительных плагинов
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

Если в качестве настроек для postcss используется `Object`, то параметр `order` может быть использован для изменения порядка плагинов:

- Тип: `Array` (имена плагинов по порядку), `String` (имя настройки), `Function`
- Значение по умолчанию: `cssnanoLast` (использовать `cssnano` последним)

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    postcss: {
      // название готовой настройки
      order: 'cssnanoLast',
      // упорядоченный список имен плагинов
      order: ['postcss-import', 'postcss-preset-env', 'cssnano']
      // функция, вычисляющая порядок плагинов
      order: (names, presets) => presets.cssnanoLast(names)
    }
  }
}
```
### postcss плагины и nuxt-tailwindcss

Если вы хотите применить плагин postcss (например, postcss-pxtorem) используя конфигурацию nuxt-tailwindcss, то требуется поменять порядок и начинать с загрузки tailwindcss.

**Эта настройка не влияет на nuxt-purgecss.**

Пример (`nuxt.config.js`):

```js
import { join } from 'path'

export default {
  // ...
  build: {
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        'postcss-pxtorem': {
          propList: [
            '*',
            '!border*',
          ]
        }
      }
    }
  }
}
```

## profile

- Тип: `Boolean`
- Значение по умолчанию: можно включить с помощью аргумента командной строки `--profile`

> Включить профилирование с помощью [WebpackBar](https://github.com/nuxt/webpackbar#profile)

## publicPath

> Nuxt.js позволяет вам загрузить готовые файлы сборки на CDN для наилучшей производительности. Для этого нужно всего лишь указать путь к CDN в `publicPath`.

- Тип: `String`
- Значение по умолчанию: `'/_nuxt/'`

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Тогда при запуске `nuxt build` загрузите содержимое папки `.nuxt/dist/client` на ваш CDN и готово!

## quiet

> Скрывает большую часть лога сборки

- Тип: `Boolean`
- Значение по умолчанию: включено, если обнаружено `CI` или `test` окружение с помощью [std-env](https://github.com/blindmedia/std-env)

## splitChunks

- Тип: `Object`
- Значение по умолчанию:

  ```js
  {
    layouts: false,
    pages: true,
    commons: true
  }
  ```

Переключает, нужно ли выделять в отдельные части код из `layout`, `pages` и `commons` (общие библиотеки: vue|vue-loader|vue-router|vuex...).


## ssr

> Создает специальный отдельный бандл для рендерера SSR.

- Тип: `Boolean`
- Значение по умолчанию: `true` для универсального режима; `false` для режима одностраничного приложения

Эта опция выбирается автоматически на основании значения `mode`, если она не была указана явно.

## styleResources

- Тип: `Object`
- Значение по умолчанию: `{}`

<div class="Alert Alert--orange">

**Внимание:** Это свойство устарело. Пожалуйста, используйте вместо этого [style-resources-module](https://github.com/nuxt-community/style-resources-module/) для лучшей производительности и процесса разработки!

</div>

Это может быть полезно, когда вы хотите вставить какие-то переменные или миксины на свои странице, но при этом не импортировать их каждый раз.

Nuxt.js использует https://github.com/yenshih/style-resources-loader для этого поведения.

Вам понадобится указать шаблоны/пути, которые вы хотите включить для любых препроцессоров: `less`, `sass`, `scss` or `stylus`

Обратите внимание, здесь нельзя использовать псевдонимы путей (`~` и `@`), нужно использовать абсолютные или относительные пути.

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

> Nuxt.js позволяет вам использовать свои шаблоны, которые будут отрисованы на основании конфигурации Nuxt. Этот функционал особенно удобен при использовании с [модулями](/guide/modules).

- Тип: `Array`

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` может быть абсолютным или относительным
        dst: 'support.js', // `dst` относительно директории `.nuxt`
        options: { // Опции передаются в шаблон по ключу `options`
          live_chat: false
        }
      }
    ]
  }
}
```

Шаблоны отрисовываются с помощью [`lodash.template`](https://lodash.com/docs/#template). Больше информации доступно [здесь](https://github.com/learn-co-students/javascript-lodash-templates-v-000).

## terser

- Тип: `Object` or `Boolean`
- Значение по умолчанию:

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

Опции для плагина terser (минификация JavaScript). Установка значения в `false` отключает плагин.

`sourceMap` будет включено, если `config.devtool` совпадает с `source-?map`

Смотрите [webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin).

## transpile

- Тип: `Array<String | RegExp | Function>`
- Значение по умолчанию: `[]`

Если вы хотите транспилировать конкретные зависимости с помощью Babel, вы можете добавить их в `build.transpile`. Каждый элемент в массиве может быть названием пакета, строкой или регулярным выражением, с которым должно совпадать название файла у зависимости.

Начиная с `v2.9.0` так же можно указывать функцию чтобы транспилировать условно. Функция получает объект с булевыми свойствами (`{ isDev, isServer, isClient, isModern, isLegacy }`):

```js
{
  build: {
    transpile: [
      ({ isLegacy }) => isLegacy && 'ky'
    ]
  }
}
```

## vueLoader

> Информация: Эта опция убрана начиная с Nuxt 2.0, используйте [`build.loaders.vue`](#loaders) вместо этого.

- Тип: `Object`
- Значение по умолчанию:

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

> Позволяет указывать опции для [загрузчика Vue](https://vue-loader.vuejs.org/options.html).

## watch

> Можно указывать свои файлы, изменения в которых будут вызывать пересборку. Этот функционал особенно удобен при работе с [модулями](/guide/modules).

- Тип: `Array<String>`

```js
export default {
  build: {
    watch: [
      '~/.nuxt/support.js'
    ]
  }
}
```

## followSymlinks

> По умолчанию процесс сборки не просматривает папки, являющиеся символическими ссылками. Этот флаг позволяет включить это поведение, разрешая использования символических ссылок, например, в папке `pages`.

- Тип: `Boolean`

```js
export default {
  build: {
    followSymlinks: true
  }
}
```
