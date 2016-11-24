---
title: What is Nuxt.js ?
---

# What is Nuxt.js ?

> Nuxt.js is a minimalistic framework for server-rendered Vue.js applications

<div class="video">
  <iframe class="youtube" src="https://www.youtube.com/embed/kmf-p-pTi40?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

## Introduction

Writing web application with [Vue.js](https://vuejs.org) is great, but when it's about configuring Webpack and Babel to be able to write `*.vue` files component, it's a bit less enjoyable.

_What about writing a server-rendered web application with Vue.js and using the `*.vue` files?_

We will add more Webpack configuration (you will need a server bundle file), adding a `preFetch` method to fetch the data from the server-side (like [vue-hackernews2.0](https://github.com/vuejs/vue-hackernews-2.0)), creating a node.js server and using `vue-server-renderer`...

## Nuxt.js to the rescue!

> The 25th of October 2016, the team behind [zeit.co](http://zeit.co/), announced [Next.js](https://zeit.co/blog/next), a framework for server-rendered React applications.

Few hours after the announcement of Next.js, the idea of creating server-rendered Vue.js applications the same way as Next.js became inevitable:  **Nuxt.js was born**.

Writing a server-rendered Vue.js application with Nuxt.js is easy:
- No need to write Webpack/Babel configuration
- No need to create a node.js server
- Writing `*.vue` files, because it rocks
- Creating new routes by adding a file in the `pages/` directory
- Accessing the server data inside the routes components easily

If you want to try using Nuxt.js, start from the [Installation Section](/guide/installation) and follow the guide.
