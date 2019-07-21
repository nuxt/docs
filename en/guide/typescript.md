---
title: TypeScript Support
description: Nuxt.js is shipped with @nuxtjs/typescript module with built-in TypeScript support.
---

> A static type system can help prevent many potential runtime errors, especially as applications grow.
>
> That's why Nuxt's brand new `@nuxt/typescript` package ships built-in TypeScript tooling support:
> - Nuxt official type definitions
> - Autocompletion in IDE
> - Write everything in TypeScript fashion (`layouts`, `pages`, `components`, `plugins`, `store`)
> - Runtime TS support (`nuxt.config.ts`, `modules`, `serverMiddlewares`)
> - TSX Support

## Get started

To use TypeScript in your project, install `@nuxt/typescript` in `devDependencies` and `ts-node` in `dependencies`:

```sh
npm i -D @nuxt/typescript
npm i ts-node
# OR
yarn add -D @nuxt/typescript
yarn add ts-node
```

<div class="Alert Alert--gray">

**INFO:** `@nuxt/typescript` ships typescript-related dependencies needed to compile TypeScript files & check types in a separate process.

</div>

<div class="Alert Alert--gray">

**INFO:** `ts-node` extends `@nuxt/core` to enable runtime TypeScript support for `nuxt.config.ts` & `serverMiddlewares`.

</div>

You'll also need to create an empty `tsconfig.json` file in your root project folder, through either a code editor or command line:

```sh
touch tsconfig.json
```

<div class="Alert Alert--gray">

**INFO:** The `tsconfig.json` file will automatically update with default values the first time you run the `nuxt` command.

</div>

## From JavaScript to TypeScript

### Configuration file

To use TypeScript in your configuration file, all you need to do is rename `nuxt.config.js` in your root project folder to `nuxt.config.ts`.

Nuxt.js also brings type definitions which provides autocompletion and type checking:

```ts
import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  // Type or Press `Ctrl + Space` for autocompletion
}

export default config
```

### Components

For components, we highly advise you to use [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) which depends on [vue-class-component](https://github.com/vuejs/vue-class-component).

Here is a basic example of mixing a `page` with a reusable `component` to display data fetched with Nuxt's [`asyncData`](https://nuxtjs.org/guide/async-data) method.

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

You can use the exact same logic for `layouts`.

### Server Configuration with Express

To use TypeScript in your server file you will need to update the following:

> - Rename server/index.js to server/index.ts
> - Replace all `require` statements with `import` statements inside the server/index.ts file
> - Remove the ".js" file extension from the `nuxt.config.js` import 

Here is an example

```ts
/* server/index.ts */
import express from 'express'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
const app = express()

// Import and Set Nuxt.js options
import config from '../nuxt.config'
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
```

Next we should add a `nodemon.json` configuration file to our project root:

```json
/* nodemon.json */
{
  "restartable": "rs",
  "ignore": [".git", "node_modules/**/node_modules"],
  "verbose": false,
  "execMap": {
    "ts": "node --require ts-node/register"
  },
  "watch": ["server/index.ts"],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "ts"
}
```

Finally, update our `package.json` "scripts" section

```json
/* package.json */
...
  "scripts": {
    "dev": "cross-env nodemon server/index.ts",
    "start": "cross-env NODE_ENV=production ts-node server/index.ts"
  },
...
```

<div class="Alert Alert--gray">

`node` only supports the "commonjs" module option in the tsconfig.json file.

</div>

If you are NOT using the "commonjs" module option inside your default tsconfig.json file you have two options:
> - Change the module option to `"module": "commonjs"`
OR
> - Add or `touch` an new tsconfig in the server directory e.g., `server/tsconfig.json`
> - Tell our `nodemon.json` file to use our new `server/tsconfig.json` instead of the default `tsconfig.json` file
> - Update our `start` script in the `package.json` file

```json
/* server/tsconfig.json */
/* this is a basic tsconfig.json file. You can add to/remove and modify everything except the module option */
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "noEmit": true,

    "strict": true,

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    "esModuleInterop": true
  }
}
```

```json
/* nodemon.json */
{
...
  "env": {
    "NODE_ENV": "development"
    "TS_NODE_PROJECT": "server/tsconfig.json"
  },
...
}
```
```json
/* package.json */
...
  "scripts": {
    ...
    "start": "cross-env NODE_ENV=production ts-node --project 'server/tsconfig.json' server/index.ts"
  },
...
```
    


## Linting with ESLint

If you're using ESLint to lint your project, here is how you can make ESLint lint your TypeScript files.

<div class="Alert Alert--teal">

**IMPORTANT:** We're assuming you have already set up [nuxt/eslint-config](https://github.com/nuxt/eslint-config) within your project.

</div>

First, you need to install @typescript-eslint/eslint-plugin and @typescript-eslint/parser ([GitHub monorepo for typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)):

```sh
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
# OR
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Then, edit your ESLint configuration `.eslintrc.js` by adding the `@typescript-eslint` plugin and making `@typescript-eslint/parser` the default parser.

A minimal configuration should look like this:

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

Finally, add or edit the `lint` script of your `package.json`:

```json
"lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore ."
```

<div class="Alert Alert--gray">

**INFO:** The `--ignore-path` option is useful in preventing ESLint from linting files/folders like `node_modules`, `.nuxt` or any others you don't want to lint.

</div>

You can now lint your TypeScript files by running `npm run lint` (or `yarn lint`).
