---
title: Introduction
description: "Nuxt.js is a Framework for creating Vue Applications, you can choose between Universal, Static Generated or Single Page application."
---

> Nuxt.js is a framework for creating Vue.js applications, you can choose between Universal, Static Generated or Single Page application.

## What is Nuxt.js?

Its main scope is **UI rendering** while abstracting away the client/server distribution.

Our goal is to create a framework flexible enough that you can use it as a main project base or in addition to your current project based on Node.js.

Nuxt.js presets all the configuration needed to make your development of a **server-rendered** Vue.js Application more enjoyable.

In addition, we also provide another deployment option called: *nuxt generate*. It will build a **statically generated** Vue.js Application.
We believe that option could be the next big step in the development of Web Applications with microservices.

Furthermore, you can also use Nuxt.js to create single page applications (`spa` mode) quickly, useful to keep Nuxt features while working on backoffice applications.

As a framework, Nuxt.js comes with a lot of features to help you in your development between the client side and the server side such as Asynchronous Data, Middleware, Layouts, etc.

## How it Works

![Vue with webpack and Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js includes the following to create a rich web application development:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) (included only when using the [store option](/guide/vuex-store))
- [Vue Server Renderer](https://ssr.vuejs.org/en/) (excluded when using [`mode: 'spa'`](/api/configuration-mode))
- [vue-meta](https://github.com/nuxt/vue-meta)

A total of only **57kB min+gzip** (60kB with Vuex).

Under the hood we use [webpack](https://github.com/webpack/webpack) with [vue-loader](https://github.com/vuejs/vue-loader) and [babel-loader](https://github.com/babel/babel-loader) to bundle, code-split and minify your code.

## Features

- Write Vue Files (`*.vue`)
- Automatic Code Splitting
- Server-Side Rendering
- Powerful Routing System with Asynchronous Data
- Static File Serving
- [ES2015+](https://babeljs.io/docs/en/learn/) Transpilation
- Bundling and minifying of your JS & CSS
- Managing `<head>` element (`<title>`, `<meta>`, etc.)
- Hot module replacement in Development
- Pre-processor: Sass, Less, Stylus, etc.
- HTTP/2 push headers ready
- Extending with Modular architecture

## Schema

This schema shows what is called by Nuxt.js when the server is called or when the user navigates through the app via `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.svg)

## Server Rendered (Universal SSR)

You can use Nuxt.js as a framework to handle all the UI rendering of your project.

When launching `nuxt`, it will start a development server with hot-reloading and [Vue Server Renderer](https://ssr.vuejs.org/en/) configured to automatically server-render your application.

### Single Page Applications (SPA)

If, for any reason, you prefer not to use server side rendering or need static hosting for your applications, you can simply use SPA mode using `nuxt --spa`. In combination with the *generate* feature, it gives you a powerful SPA deployment mechanism without the need to use a Node.js runtime or any special server handling.

Take a look at [the commands](/guide/commands) to learn more about usage.

If you already have a server, you can plug Nuxt.js by using it as a middleware. There is no restriction at all when using Nuxt.js for developing your Universal Web Applications. See the [Using Nuxt.js Programmatically](/api/nuxt) guide.

## Static Generated (Pre Rendering)

The big innovation of Nuxt.js comes with the `nuxt generate` command.

When building your application, it will generate the HTML for every one of your routes and store it in a file.

<div>
  <a href="https://vueschool.io/courses/static-site-generation-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/static-site-generation-with-nuxtjs.png" alt="Static Site Generation with Nuxt.js by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Static Site Generation with Nuxt.js</h4>
      <p class="Promote__Content__Description">Learn how to generate static websites (pre rendering) to improve both performance and SEO while eliminating hosting costs.</p>
      <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js development.</p>
    </div>
  </a>
</div>

For example, the following file structure:

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

With this, you can host your generated web application on any static hosting!

The best example is this website. It is generated and hosted on [Netlify](https://www.netlify.com), see our [source code](https://github.com/nuxt/nuxtjs.org) or [How to deploy Nuxt.js to Netlify](https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt) from Vue School.

We don't want to manually generate the application every time we update the [docs repository](https://github.com/nuxt/docs), it triggers a hook to Netlify which:

1. Clones the [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org)
2. Installs the dependencies via `npm install`
3. Runs `npm run generate`
4. Serves the `dist` directory

We now have an automated **Static Generated Web Application** :)

We can go further by thinking of an e-commerce web application made with `nuxt generate` and hosted on a CDN. Every time a product is out of stock or back in stock, we regenerate the web app. But if the user navigates through the web app in the meantime, it will be up to date thanks to the API calls made to the e-commerce API. No need to have multiple instances of a server + a cache any more!

<div class="Alert">

See [How to deploy on Netlify?](/faq/netlify-deployment) for more details on how to deploy to Netlify.

</div>
