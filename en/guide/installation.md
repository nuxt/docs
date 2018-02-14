---
title: Installation
description: Nuxt.js is really easy to get started with. A simple project only needs the `nuxt` dependency.
---

> Nuxt.js is really easy to get started with. A simple project only needs the `nuxt` dependency.

## Using Nuxt.js starter template

To get started quickly, the Nuxt.js team has created a [starter template](https://github.com/nuxt-community/starter-template).

[Download the .zip](https://github.com/nuxt-community/starter-template/archive/master.zip) starter template or install it with vue-cli:

```bash
$ vue init nuxt-community/starter-template <project-name>
```

> If [vue-cli](https://github.com/vuejs/vue-cli) is not installed, please install it with `npm install -g vue-cli`

then install the dependencies:

```bash
$ cd <project-name>
$ npm install
```

and launch the project with:

```bash
$ npm run dev
```

The application is now running on http://localhost:3000.

<p class="Alert">Nuxt.js will listen for file changes inside the <code>pages</code> directory, so there is no need to restart the application when adding new pages.</p>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).

## Starting from scratch

Creating a Nuxt.js application from scratch is also really easy, it only needs *1 file and 1 directory*. Let's create an empty directory to start working on the application:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

<p class="Alert Alert--nuxt-green"><b>Info:</b> replace <code>&lt;project-name&gt;</nom-du-projet></code> by the name of the project.</p>

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

The application is now running on http://localhost:3000.

<p class="Alert">Nuxt.js will listen for file changes inside the <code>pages</code> directory, so there is no need to restart the application when adding new pages.</p>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).
