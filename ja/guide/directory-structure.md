---
title: Directory Structure
description: The default Nuxt.js application structure is intended to provide a great starting point for both large and small applications.
---

> The default Nuxt.js application structure is intended to provide a great starting point for both small and large applications. Of course, you are free to organize your application however you like.

## Directories

### The Assets Directory

The `assets` directory contains your un-compiled assets such as LESS, SASS, or JavaScript.

[More documentation about Assets integration](/guide/assets)

### The Components Directory

The `components` directory contains your Vue.js Components. Nuxt.js doesn't supercharge the data method on these components.

### The Layouts Directory

The `layouts` directory contains your Application Layouts.

_This directory can not be renamed._

[More documentation about Layouts integration](/guide/views#layouts)

### The Middleware Directory

_Coming soon_

### The Pages Directory

The `pages` directory contains your Application Views and Routes. The framework reads all the `.vue` files inside this directory and create the router of your application.

_This directory can not be renamed._

[More documentation about Pages integration](/guide/views)

### The Plugins Directory

The `plugins` directory contains your Javascript plugins that you want to run before instantiating the root vue.js application.

[More documentation about Plugins integration](/guide/plugins)

### The Static Directory

The `static` directory contains your static files. Each files inside this directory is mapped to /.

**Example:** /static/robots.txt is mapped as /robots.txt

_This directory can not be renamed._

[More documentation about Static integration](/guide/assets#static)

### The Store Directory

The `store` directory contains your [Vuex Store](http://vuex.vuejs.org) files. Vuex Store option is implemented in the Nuxt.js framework. Creating a `index.js` file in this directory activate the option in the framework automatically.

_This directory can not be renamed._

[More documentation about Store integration](/guide/vuex-store)

### The nuxt.config.js File

The `nuxt.config.js` file contains your Nuxt.js custom configuration.

_This file can not be renamed._

[More documentation about nuxt.config.js integration](/guide/configuration)

### The package.json File

The `package.json` file contains your Application dependencies and scripts.

_This file can not be renamed._

## Aliases

| Alias | Directory |
|-----|------|
| ~ | / |
| ~assets | /assets |
| ~components | /components |
| ~pages | /pages |
| ~plugins | /plugins |
| ~static | /static |

Aliases which link to files:

| Alias | Usage | Description |
|-------|------|--------------|
| ~store | `const store = require('~store')` | Import the `vuex` store instance. |
| ~router | `const router = require('~router')`| Import the `vue-router` instance. |
