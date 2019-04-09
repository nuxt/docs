---
title: TypeScript Support
---

> A static type system can help prevent many potential runtime errors, especially as applications grow.
>
> That's why Nuxt's brand new `@nuxt/typescript` package ships built-in TypeScript tooling support :
> - Nuxt official type definitions
> - Autocompletion in IDE
> - Write everything in TypeScript fashion (`layouts`, `pages`, `components`, `plugins`, `store`)
> - Runtime TS support (`nuxt.config.ts`, `modules`, `serverMiddlewares`)
> - TSX Support

## Get started

To be able to use TypeScript in your project, you will need to install `@nuxt/typescript` as `devDependency` and `ts-node` as `dependency` :
```sh
npm i -D @nuxt/typescript
npm i ts-node
# OR
yarn add -D @nuxt/typescript
yarn add ts-node
```

<div class="Alert Alert--gray">

`@nuxt/typescript` ships typescript related dependencies needed to compile TypeScript files & check types in a separate process.  

</div>

<div class="Alert Alert--gray">

`ts-node` extends Nuxt core to enable runtime TypeScript support for `nuxt.config.ts` & `serverMiddlewares`.

</div>

You'll also need to create an empty `tsconfig.json` file in your root project folder, through either code editor or command line :

```sh
touch tsconfig.json
```

<div class="Alert Alert--gray">

**INFO:** The `tsconfig.json` file will be automatically updated with defaults value the first time you're running `nuxt` command.

</div>

## From JavaScript to TypeScript

### Configuration file

To be able to use TypeScript in your configuration file, all you need is to rename `nuxt.config.js` in `nuxt.config.ts`.

Nuxt.js also brings type definitions which provides autocompletion and type checking :

```ts
import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  // Type or Press `Ctrl + Space` for autocompletion
}

export default config
```

### Components

For components, we highly advice to use [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) which depends on [vue-class-component](https://github.com/vuejs/vue-class-component).

Here is a basic example mixing a `page` and a reusable `component` to display data fetched with Nuxt `asyncData`.

```ts
/* models/Post.ts */
export default Post {
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
import axios from 'axios'
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
import { Component, Vue, Prop } from 'vue-property-decorator'
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

You can use exact same logic for `layouts`.

## Linting with ESLint

If you're using ESLint to lint your project, here is how you can make ESLint lint your TypeScript files. 

<div class="Alert Alert--teal">

**IMPORTANT:** We're assuming you have already set up [nuxt/eslint-config](https://github.com/nuxt/eslint-config) within your project.

</div>

First, you need to install the [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) plugin :

```sh
npm install -D @typescript-eslint/eslint-plugin
# OR
yarn add -D @typescript-eslint/eslint-plugin
```

Then, edit your ESLint configuration (`.eslintrc.js`) by adding the `@typescript-eslint` plugin and making `@typescript-eslint/parser` the default parser.  

A minimal configuration should look like this :

```js
module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs'
  ]
}

```

Finally, add or edit the `lint` script of your `package.json` :

```json
"lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore ."
```

> `--ignore-path` option is useful to prevent ESLint linting files/folders like `node_modules`, `.nuxt` or whatever you don't want it to lint.

You can now lint your TypeScript files by running `npm run lint` (or `yarn lint`).
