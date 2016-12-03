---
title: Installation
---

# Installation

> Nuxt.js is really easy to get started with. A simple project only need the `nuxt` dependency.

# Table of Contents
1. [Using Nuxt.js starter template](#using-nuxt-js-starter-template)
2. [Starting from scratch](#starting-from-scratch)

## Using Nuxt.js starter template

To start quickly, the Nuxt.js team has created [vue-cli starter template](https://github.com/nuxt/starter).

If [vue-cli](https://github.com/vuejs/vue-cli) is not installed, please install it with `npm install -g vue-cli`:

```bash
$ vue init nuxt/starter <project-name>
$ cd <project-name>
$ npm install
```

and launch the project with:
```bash
$ npm run dev
```
The application is now running on http://localhost:3000

<p class="Alert">Info: Nuxt.js will listen on the files changes inside the `pages` directory, so no need to restart the application when adding new pages</p>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).

## Starting from scratch

Creating a Nuxt.js application from scratch is also really easy, it only needs *1 file and 1 directory*. Let's create an empty directory to start working on the application:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

*Info: replace project-name by the name of the project.*

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

Once the `package.json` has been created, add `nuxt` to the project via NPM:
```bash
npm install --save nuxt
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
The application is now running on http://localhost:3000

<p class="Alert">Info: Nuxt.js will listen on the files changes inside the `pages` directory, so no need to restart the application when adding new pages</p>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).
