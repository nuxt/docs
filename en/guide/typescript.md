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
