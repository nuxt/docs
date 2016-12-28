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

Vue + Vue-Router + Vuex*
+
Webpack + Vue-Loader
+
Babel (ES6)

* Included only when using the store feature.

## Features

- Write Vue files
- Hot reloading
- Code Splitting
- Server-side rendering
- ES6/ES7 transpilation
- Minification of JS/CSS
- Pre-processor (JSX, SASS, LESS, Stylus, etc)
- ...

## Server Rendered App

You can use nuxt.js as a framework to handle all the UI rendering of your project.

If you already have a server, you can plug nuxt.js by using it as a middleware, there is no restriction at all when using nuxt for developing your Universal Web Applications.

> Documentation is coming soon

## Static Generated App

The big innovation of nuxt.js comes here: nuxt generate
-> render all the static files at build time and save every route to a HTML file
-> you can host you generated web application on any static hosting

Make it dynamic with Cloud functions (AWS Lambda)

> Documentation is coming soon
