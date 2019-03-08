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

To be able to use TypeScript in your project, you will need to install `@nuxt/typescript`
```sh
npm install -D @nuxt/typescript
# OR
yarn add -D @nuxt/typescript
```

<div class="Alert Alert--gray">

`@nuxt/typescript` ships typescript related dependencies and extends Nuxt core to enable runtime TypeScript support. 

</div>

You'll also need to create a minimal `tsconfig.json` file :

```sh
echo "{}" > tsconfig.json
```

<div class="Alert Alert--gray">

**INFO:** The presence of the `tsconfig.json` in your project lets Nuxt.js know you're running a TypeScript project.

This file will be automatically updated with defaults value the first time you're running `nuxt` command.

</div>

## From JavaScript to TypeScript



### Configuration file

To be able to use TypeScript in your configuration file, all you need is to rename `nuxt.config.js` in `nuxt.config.ts`.

Nuxt.js also brings type definitions which provides autocompletion and type checking :

```ts
import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration {
  // Type or Press `Ctrl + Space` for autocompletion
}

export default config
```



## Linting with ESLint

If you're using ESLint to lint your project, here is how you can make ESLint lint your TypeScript files. 

<div class="Alert Alert--teal">

**IMPORTANT:** We're assuming you have already setup [nuxt/eslint-config](https://github.com/nuxt/eslint-config) within your project.

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
