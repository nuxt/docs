---
title: Installation
---

# Installation

> Nuxt.js is really easy to get started with, to start with a simple project, we will only need the `nuxt` dependency.

# Table of Contents
1. [Using Nuxt.js starter template](#using-nuxt-js-starter-template)
2. [Starting from scratch](#starting-from-scratch)

## Using Nuxt.js starter template

To start quickly, we created a [vue-cli](https://github.com/vuejs/vue-cli) template for Nuxt.js.

If you don't have `vue-cli` installed in your computer, please install it with `npm install -g vue-cli`.

```bash
$ vue init nuxt/starter <project-name>
$ cd <project-name>
$ npm install
```

You can start your Vue.js application by launching:
```bash
$ npm run dev
```
And then visit http://localhost:3000

**Voilà!** We're ready to start working on our web applications, now let's look at the [directory structure](/guide/directory-structure) to understand what's under the hood.

## Starting from scratch

Creating a Nuxt.js application from scratch is also really easy, we only need *1 file and 1 directory*. Let's create an empty directory to start working on our application:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

*Info: replace <project-name> by the name of your project.*

### The package.json

Our project needs a `package.json` to specify how to start `nuxt`:
```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```
Thanks to `scripts`, we will be able to launch Nuxt.js via `npm run dev`.

### Installing `nuxt`

Now we have our `package.json`, we can add `nuxt` to our project:
```bash
npm install --save nuxt
```

### The `pages` directory

Nuxt.js will transform every `*.vue` file inside the `pages` directory as a route for our web application.
```bash
$ mkdir pages
```

### Voilà

We can launch our application with:
```bash
$ npm run dev
```

And then visit http://localhost:3000

### 404?!

Ok, our web application is empty, so Nuxt.js show the error page when we go to http://localhost:3000.

Let's create our first page in `pages/index.vue`:
```html
<template>
  <h1>Hello world!</h1>
</template>
```

Now if we refresh the url, we can see `Hello world` displayed on the browser.

<p class="Alert">Info: Nuxt.js will listen on the files changes inside the `pages` directory, so no need to restart the application when adding new pages</p>

### What's next?

We're now ready to start working on our web applications, let's look at the [directory structure](/guide/directory-structure) to understand a bit more how Nuxt.js works.
