---
title: Introduction
description: "The 25th of October 2016, the team behind zeit.co, announced Next.js, a framework for server-rendered React applications. Few hours after the announcement, the idea of creating server-rendered Vue.js applications the same way as Next.js was obvious: Nuxt.js was born."
---

> The 25th of October 2016, the team behind [zeit.co](https://zeit.co/), announced [Next.js](https://zeit.co/blog/next), a framework for server-rendered React applications. A few hours after the announcement, the idea of creating server-rendered [Vue.js](https://vuejs.org) applications the same way as Next.js was obvious: **Nuxt.js** was born.

## What is Nuxt.js?

Nuxt.js is a framework for creating Universal Vue.js Applications.

Its main scope is **UI rendering** while abstracting away the client/server distribution.

Our goal is to create a framework flexible enough that you can use it as a main project base or in addition to your current project based on Node.js.

Nuxt.js presets all the configuration needed to make your development of a Vue.js Application **Server Rendered** more enjoyable.

In addition, we also provide another deployment option called: *nuxt generate*. It will build a **Static Generated** Vue.js Application.
We believe that option could be the next big step in the development of Web Applications with microservices.

As a framework, Nuxt.js comes with a lot of features to help you in your development between the client side and the server side such as Asynchronous Data, Middleware, Layouts, etc.

## How it Works

![Vue with webpack and Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js includes the following to create a rich web application development:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) (included only when using the [store option](/guide/vuex-store))
- [Vue Server Renderer](https://ssr.vuejs.org/en/) (excluded when using [`mode: 'spa'`](/api/configuration-mode))
- [vue-meta](https://github.com/nuxt/vue-meta)

A total of only **57kB min+gzip** (53kB with Vuex).

Under the hood we use [webpack](https://github.com/webpack/webpack) with [vue-loader](https://github.com/vuejs/vue-loader) and [babel-loader](https://github.com/babel/babel-loader) to bundle, code-split and minify your code.

## Features

- Write Vue Files (`*.vue`)
- Automatic Code Splitting
- Server-Side Rendering
- Powerful Routing System with Asynchronous Data
- Static File Serving
- ES2015+ Transpilation
- Bundling and minifying of your JS & CSS
- Managing `<head>` element (`<title>`, `<meta>`, etc.)
- Hot module replacement in Development
- Pre-processor: Sass, Less, Stylus, etc.
- HTTP/2 push headers ready
- Extending with Modular architecture

## Schema

This schema shows what is called by Nuxt.js when the server is called or when the user navigate through the app via `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.svg)

## Server Rendered (Universal SSR)

You can use Nuxt.js as a framework to handle all the UI rendering of your project.

When launching `nuxt`, it will start a development server with hot-reloading and [Vue Server Renderer](https://ssr.vuejs.org/en/) configured to automatically server-render your application.

### Single Page Applications (SPA)

If, for any reason, you prefer not to use server side rendering or need static hosting for your applications, you can simply use SPA mode using `nuxt --spa`. In combination with the *generate* feature, it gives you a powerful SPA deployment mechanism without the need to use a Node.js runtime or any special server handling.

Take a look at [the commands](/guide/commands) to learn more about usage.

If you already have a server, you can plug Nuxt.js by using it as a middleware. There is no restriction at all when using Nuxt.js for developing your Universal Web Applications. See the [Using Nuxt.js Programmatically](/api/nuxt) guide.

## Static Generated (Pre Rendering)

The big innovation of Nuxt.js comes with the `nuxt build && nuxt export` command for Nuxt >= v2.13 or `nuxt generate` command for Nuxt <= v2.12.

When building your application, it will generate the HTML for every one of your routes and store it in a file.

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

The best example is this website. It is generated and hosted on GitHub Pages:

- [Source code](https://github.com/nuxt/nuxtjs.org)
- [Generated code](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

We don't want to manually generate the application every time we update the [docs repository](https://github.com/nuxt/docs), so each push made calls to an AWS Lambda function which:

1. Clones the [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org)
2. Installs the dependencies via `npm install`
3. Runs `nuxt build && nuxt export`(>= v2.13) or `nuxt generate`(<= v2.12)
4. Pushes the `dist` folder to the `gh-pages` branch

We now have a **Serverless Static Generated Web Application** :)

The new full static module which is available since v2.13 generates your html and static assets at build time which means everything is already generated and therefore not only is it great for SEO but it can also be hosted for free on any of the static hosting providers. 

Nuxt v2.13 also comes with a crawler installed which will crawl your link tags and generate your dynamic routes based on these links which means there is no need to manually generate your dynamic links anymore.

The static target works by saving the calls to your API in payload.js files in a static folder. These payloads are then cached for better performance and offline support and as your API is not called on client side navigation any more (when called using asyncData and fetch), it also means you do not have to expose your API to the public. 

When your site is generated your html is generated with all it's content and on client side navigation these pages are reconstructed using the payload files for your API data. By separating the code from the content you can easily re-generate your content without the need to re-build your whole site. That means once your site is built and you only want to change your content you can simply call `nuxt export` which will re-generate your content only, and as the content doesn't need to go through webpack it means content regeneration is lightening fast. 

If you want to generate static sties, using Nuxt >= v2.13, you will need to add `static` as the `target` in your nuxt.config file. The default value for `target` is `server`.

`nuxt.config.js`
```js
export default {
  target: 'static'
}
```
To learn more about the new static target checkout our [article](/blog/going-full-static)

<div class="Alert">

See [How to deploy on Netlify?](/faq/netlify-deployment) for more details on how to deploy to Netlify.

</div>
