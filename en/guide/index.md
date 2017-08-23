---
title: Introduction
description: "The 25th of October 2016, the team behind zeit.co, announced Next.js, a framework for server-rendered React applications. Few hours after the announcement, the idea of creating server-rendered Vue.js applications the same way as Next.js was obvious: Nuxt.js was born."
---

> The 25th of October 2016, the team behind [zeit.co](https://zeit.co/), announced [Next.js](https://zeit.co/blog/next), a framework for server-rendered React applications. Few hours after the announcement, the idea of creating server-rendered [Vue.js](https://vuejs.org) applications the same way as Next.js was obvious: **Nuxt.js** was born.

## What is Nuxt.js ?

Nuxt.js is a framework for creating Universal Vue.js Applications.

Its main scope is **UI rendering** while abstracting away the client/server distribution.

Our goal is to create a framework flexible enough so that you can use it as a main project base or in addition to your current project based on Node.js.

Nuxt.js presets all the configuration needed to make your development of a Vue.js Application **Server Rendered** more enjoyable.

In addition, we also provide another deployment option called: *nuxt generate*. It will build a **Static Generated** Vue.js Application.
We believe that option could be the next big step in the development of Web Applications with microservices.

As a framework, Nuxt.js comes with a lot of features to help you in your development between the client side and the server side such as Asynchronous Data, Middleware, Layouts, etc.

## How it Works

![Vue with Webpack and Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js includes the following to create a rich web application development:

- [Vue 2](https://github.com/vuejs/vue)
- [Vue-Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex) (included only when using the [store option](/guide/vuex-store))
- [Vue-Meta](https://github.com/declandewet/vue-meta)

A total of only **57kb min+gzip** (53kb with vuex).

Under the hood we use [Webpack](https://github.com/webpack/webpack) with [vue-loader](https://github.com/vuejs/vue-loader) and [babel-loader](https://github.com/babel/babel-loader) to bundle, code-split and minify your code.

## Features

- Write Vue Files
- Automatic Code Splitting
- Server-Side Rendering
- Powerful Routing System with Asynchronous Data
- Static File Serving
- ES6/ES7 Transpilation
- Bundling and minifying of your JS & CSS
- Managing `<head>` element (title, meta...)
- Hot module replacement in Development
- Pre-processor: SASS, LESS, Stylus, etc
- HTTP/2 push headers ready
- Extending with Modular architecture

## Schema

This schema shows what is called by nuxt.js when the server is called or when the user navigate through the app via `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.png)

## Server Rendered (Universal SSR)

You can use nuxt.js as a framework to handle all the UI rendering of your project.

When launching `nuxt`, it will start a development server with hot-reloading and [vue-server-renderer](https://ssr.vuejs.org/en/) configured to automatically server-render your application.

### Single Page Applications (SPA)

If for any reason you prefer not using server side rendering or need static hosting for your applications, you can simply use SPA mode using `nuxt --spa`. Combination with *generate* feature gives a powerful SPA deployment mechanism without need to use Node.js runtime or any special server handling.

Take a look at [the commands](/guide/commands) to learn more about usage.

If you already have a server, you can plug Nuxt.js by using it as a middleware, there is no restriction at all when using nuxt.js for developing your Universal Web Applications, see the [Using Nuxt.js Programmatically](/api/nuxt) guide.

## Static Generated (Pre Rendering)

The big innovation of nuxt.js comes here: `nuxt generate`

When building your application it will generate the HTML for every one of your routes and store it in a file.

Example:

```bash
-| pages/
----| about.vue
----| index.vue
```

Will generate:

```
-| dist/
----| about/
------| index.html
----| index.html
```

This way, you can host your generated web application on any static hosting!

The best example is this website. It is generated and hosted on GitHub Pages:

- [Source code](https://github.com/nuxt/nuxtjs.org)
- [Generated code](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

We don't want to manually generate the application every time we update the [docs repository](https://github.com/nuxt/docs), so each push made calls an AWS Lambda function which:

1. Clone the [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org)
2. Install the dependencies via `npm install`
3. Run `nuxt generate`
4. Push the `dist` folder to the `gh-pages` branch

We now have a **Serverless Static Generated Web Application** :)

We can go further by thinking of an e-commerce web application made with `nuxt generate` and hosted on a CDN, and every time a product is out of stock or back in stock, we regenerate the web app. But if the user navigates through the web app in the meantime, it will be up to date thanks to the API calls made to the e-commerce API. No need to have multiple instances of a server + a cache anymore!
