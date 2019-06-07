---
title: 支持 TypeScript
---

> 静态类型系统有助于防止许多潜在的运行时错误，尤其是在应用程序不断增长时。
>
> 这就是为什么Nuxt的全新 `nuxt-ts` 软件包提供了内置的 *TypeScript* 工具支持：
> - Nuxt官方类型声明
> - IDE 中的自动补全功能
> - 以TypeScript方式编写所有内容 (`layouts`, `pages`, `components`, `plugins`, `store`)
> - 支持TS编译 (`nuxt.config.ts`, `modules`, `serverMiddlewares`)
> - 支持TSX

## 快速开始

为了能够在项目中使用TypeScript，您需要将`@nuxt/typescript`和`ts-node`作为开发依赖项安装：

```sh
npm i -D @nuxt/typescript
npm i ts-node
# OR
yarn add -D @nuxt/typescript
yarn add ts-node
```

<div class="Alert Alert--gray">

`@nuxt/typescript`提供了在单独的进程来编译TypeScript文件和检查类型所需的typescript相关依赖项。

</div>

<div class="Alert Alert--gray">

`ts-node`扩展了Nuxt核心，为`nuxt.config.ts`和`serverMiddlewares`开启了运行时TypeScript支持。

</div>

您还需要通过代码编辑器或命令行在根项目文件夹中创建一个空的`tsconfig.json`文件：

```sh
touch tsconfig.json
```

<div class="Alert Alert--gray">

**提示：** `tsconfig.json`文件将在您第一次运行`nuxt`命令时使用默认值自动更新。

</div>

## 从 JavaScript 到 TypeScript

### 配置文件

为了能够在配置文件中使用TypeScript，您只需要将`nuxt.config.js`重命名为`nuxt.config.ts`。

Nuxt.js还带有提供自动补全和类型检查的类型定义：

```ts
import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  // Type or Press `Ctrl + Space` for autocompletion
}

export default config
```

### 组件

在组件中，我们强烈建议使用依赖于[vue-class-component](https://github.com/vuejs/vue-class-component)的[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)。

以下是可复用组件用来显示使用Nuxt中 `asyncData`获取的数据展示在页面中的基本示例。

```ts
/* models/Post.ts */
export default interface Post {
  id: number
  title: string
  description: string
}
```

```html
<!-- components/PostPreview.vue -->
<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Post from '~/models/Post'

@Component
export default class PostPreview extends Vue {
  @Prop({ type: Object, required: true }) post!: Post
}
</script>
```

```html
<!-- pages/feed.vue -->
<template>
  <div>
    <PostPreview v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import Post from '~/models/Post'

@Component({
  components: {
    PostPreview: () => import('~/components/PostPreview.vue')
  },
  async asyncData () {
    let { data } = await axios.get(`https://my-api/posts`)
    return {
      posts: data
    }
  }
})
export default class FeedPage extends Vue {
  posts: Post[] = []
}
</script>
```

您可以对**布局组件(`layouts`)**使用完全相同的逻辑。

## 使用ESLint

If you're using ESLint to lint your project, here is how you can make ESLint lint your TypeScript files.
如果您正在使用ESLint来对项目进行代码规范检查，那么您可以使用以下方法将ESLint添加进来：
<div class="Alert Alert--teal">

**重点：** 我们假设您已经在项目中设置了[nuxt/eslint-config](https://github.com/nuxt/eslint-config)。

</div>

首先，您需要安装[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)插件：

```sh
npm install -D @typescript-eslint/eslint-plugin
# OR
yarn add -D @typescript-eslint/eslint-plugin
```

然后，通过添加`@typescript-eslint`插件并使`@typescript-eslint/parser`作为默认解析器来编辑ESLint配置(`.eslintrc.js`)。

最轻量化配置应如下所示：

```js
module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error'
  }
}

```

最后，添加或编辑`package.json`的`lint`脚本：

```json
"lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore ."
```

> `--ignore-path` option is useful to prevent ESLint linting files/folders like `node_modules`, `.nuxt` or whatever you don't want it to lint.

--ignore-path选项对于忽略某些不想被检查的文件或文件夹(例如`node_modules`，`.nuxt`或任何您不希望它被检查的文件或者文件夹)非常有用。

您现在可以通过运行`npm run lint` (或者 `yarn lint`)来检查您的TypeScript文件的代码风格错误或其他不规范。
