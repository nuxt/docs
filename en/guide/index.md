---
title: Introduction
description: "The 25th of October 2016, the team behind zeit.co, announced Next.js, a framework for server-rendered React applications. Few hours after the announcement, the idea of creating server-rendered Vue.js applications the same way as Next.js was obvious: Nuxt.js was born."
---

> The 25th of October 2016, the team behind [zeit.co](https://zeit.co/), announced [Next.js](https://zeit.co/blog/next), a framework for server-rendered React applications. Few hours after the announcement, the idea of creating server-rendered [Vue.js](https://vuejs.org) applications the same way as Next.js was obvious: **Nuxt.js** was born.

## What is Nuxt.js ?

Nuxt.js is a framework for creating Universal Vue.js Applications.

Its main scope is **UI rendering** while abstracting away the client/server distribution.

Our goal is to create a framework flexible that you can use as a main project base or in addition to your current project based on Node.js.

Nuxt.js presets all the configuration needed to make your development of a Vue.js Application **Server Rendered** more enjoyable.

In addition, we also provide an other deployment option called: *nuxt generate*. It will build a **Static Generated** Vue.js Application.
We believe that option could be the next big step in the development of Web Application with microservices.

As a framework, Nuxt.js comes will a lot of features to help you in your development between the client side and the server side such as Asynchronous Data, Middleware, Layouts, etc.

## How it Works

![Vue with Webpack and Babel](http://i.imgur.com/avEUftE.png)

Nuxt.js includes theses following to create a rich web application development:
- [Vue 2](https://github.com/vuejs/vue)
- [Vue-Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex) (included only when using the [store option](/guide/vuex-store))
- [Vue-Meta](https://github.com/declandewet/vue-meta)

A total of only **28kb min+gzip** (31kb with vuex).

Under the hood we use [Webpack](https://github.com/webpack/webpack) with [vue-Loader](https://github.com/vuejs/vue-loader) and [babel-loader](https://github.com/babel/babel-loader) to bundle, code-split and minify your code.

## Features

- Write Vue Files
- Automatic Code Splitting
- Server-Side Rendering
- Powerful Routing System with Asynchronous Data
- Static File Serving
- ES6/ES7 Transpilation
- Bundling and minifying of your JS & CSS
- Managing Head Elements
- Hot reloading in Development
- ESLint Integration
- Pre-processor: SASS, LESS, Stylus, etc

## Server Rendered

You can use nuxt.js as a framework to handle all the UI rendering of your project.

If you already have a server, you can plug nuxt.js by using it as a middleware, there is no restriction at all when using nuxt for developing your Universal Web Applications.

> Documentation is coming soon

## Static Generated

The big innovation of nuxt.js comes here: `nuxt generate`

When building your application it will generate the HTML of every of your routes to store it in a file.

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

This way, you can host you generated web application on any static hosting!

The best example is this website, it's generated and hosted on Github Pages:
- [Source code](https://github.com/nuxt/nuxtjs.org)
- [Generated code](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

And because we don't want to generate the page every time we update the [docs repository](https://github.com/nuxt/docs), every push made to it launches an AWS Lambda function which:
1. Clone the [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org)
2. Install the dependencies (`npm install`)
3. Run `nuxt generate`
4. Push the `dist` folder to the `gh-pages` branch

We now have a **Serverless Static Generated Web Application** :)
