---
title: Installation
description: Nuxt.js is really easy to get started with. A simple project only needs the `nuxt` dependency.
---

> Nuxt.js is really easy to get started with. A simple project only needs the `nuxt` dependency.

<div>
  <a href="https://vueschool.io/courses/nuxtjs-fundamentals/?friend=nuxt" target="_blank" class="Promote">
    <img src="/nuxt-fundamentals.png" srcset="/nuxt-fundamentals-2x.png 2x" alt="Nuxt Fundamentals by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Nuxt.js Fundamentals</h4>
      <p class="Promote__Content__Description">Learn how to get started quickly with Nuxt.js in videos.</p>
      <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js development.</p>
    </div>
  </a>
</div>

## Using `create-nuxt-app`

To get started quickly, the Nuxt.js team has created scaffolding tool [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since NPM `5.2.0`)

```bash
$ npx create-nuxt-app <project-name>
```

Or with [yarn](https://yarnpkg.com/en/):

```bash
$ yarn create nuxt-app <project-name>
```

It will ask you some questions:

1. Choose between integrated server-side frameworks:
  - None (Nuxt default server)
  - [Express](https://github.com/expressjs/express)
  - [Koa](https://github.com/koajs/koa)
  - [Hapi](https://github.com/hapijs/hapi)
  - [Feathers](https://github.com/feathersjs/feathers)
  - [Micro](https://github.com/zeit/micro)
  - [Fastify](https://github.com/fastify/fastify)
  - [Adonis](https://github.com/adonisjs/adonis-framework) (WIP)
2. Choose your favorite UI framework:
  - None (feel free to add one later)
  - [Bootstrap](https://github.com/bootstrap-vue/bootstrap-vue)
  - [Vuetify](https://github.com/vuetifyjs/vuetify)
  - [Bulma](https://github.com/jgthms/bulma)
  - [Tailwind](https://github.com/tailwindcss/tailwindcss)
  - [Element UI](https://github.com/ElemeFE/element)
  - [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)
  - [Buefy](https://buefy.github.io)
  - [iView](https://www.iviewui.com/)
  - [Tachyons](https://tachyons.io)
3. Choose your favorite testing framework:
  - None (feel free to add one later)
  - [Jest](https://github.com/facebook/jest)
  - [AVA](https://github.com/avajs/ava)
4. The [Nuxt mode you want (`Universal` or `SPA`)](https://nuxtjs.org/guide#single-page-applications-spa-)
5. Add [axios module](https://github.com/nuxt-community/axios-module) to make HTTP request easily into your application.
6. Add [EsLint](https://eslint.org/) to Lint your code on save.
7. Add [Prettier](https://prettier.io/) to prettify your code on save.

When answered, it will install all the dependencies so the next step is to navigate to the project folder and launch it with:

```bash
$ cd <project-name>
$ npm run dev
```

The application is now running on http://localhost:3000.

<div class="Alert">

Nuxt.js will listen for file changes inside the <code>pages</code> directory, so there is no need to restart the application when adding new pages.

</div>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).

## Starting from scratch

Creating a Nuxt.js application from scratch is also really easy, it only needs *1 file and 1 directory*. Let's create an empty directory to start working on the application:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

<div class="Alert Alert--nuxt-green">

<b>Info:</b> replace <code>&lt;project-name&gt;</nom-du-projet></code> by the name of the project.

</div>

### The package.json

The project needs a `package.json` file to specify how to start `nuxt`:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`scripts` will launch Nuxt.js via `npm run dev`.

### Installing `nuxt`

Once the `package.json` has been created, add `nuxt` to the project via npm:

```bash
$ npm install --save nuxt
```

### The `pages` directory

Nuxt.js will transform every `*.vue` file inside the `pages` directory as a route for the application.

Create the `pages` directory:

```bash
$ mkdir pages
```

then create the first page in `pages/index.vue`:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

and launch the project with:

```bash
$ npm run dev
```

The application is now running on http://localhost:3000.

<div class="Alert">

Nuxt.js will listen for file changes inside the <code>pages</code> directory, so there is no need to restart the application when adding new pages.

</div>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).
