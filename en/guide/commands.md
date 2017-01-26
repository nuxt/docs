---
title: Commands
description: Nuxt.js comes with a set of useful commands, both for development and production purpose.
---

> Nuxt.js comes with a set of useful commands, both for development and production purpose.

## List of Commands

| Command | Description |
|---------|-------------|
| nuxt | Launch a development server on [localhost:3000](http://localhost:3000) with hot-reloading. |
| nuxt build | Build your application with webpack and minify the JS & CSS (for production). |
| nuxt start | Start the server in production mode (After running `nuxt build`). |
| nuxt generate | Build the application and generate every route as a HTML file (used for static hosting). |

You should put these commands in the `package.json`:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

Then, you can launch your commands via `npm run <command>` (example: `npm run dev`).

## Development Environment

To launch Nuxt in development mode with the hot reloading:

```bash
nuxt
// OR
npm run dev
```

## Production Deployment

Nuxt.js lets your choose between 2 modes to deploy your application: Server Rendered or Static Generated.

### Server Rendered Deployment

To deploy, instead of running nuxt, you probably want to build ahead of time. Therefore, building and starting are separate commands:

```bash
nuxt build
nuxt start
```

The `package.json` like follows is recommended:
```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

Note: we recommend putting `.nuxt` in `.npmignore` or `.gitignore`.

### Static Generated Deployment

Nuxt.js gives you the possibility to host your web application on any static hosting.

To generate our web application into static files:

```bash
npm run generate
```

It will create a `dist` folder with everything inside ready to be deployed on a static hosting.

If you have a project with [dynamic routes](/guide/routing#dynamic-routes), take a look at the [generate configuration](/api/configuration-generate) to tell nuxt.js how to generate these dynamic routes.

<div class="Alert">When generating your web application with `nuxt generate`, [the context](/api#context) given to [data()](/guide/async-data#the-data-method) and [fetch()](/guide/vuex-store#the-fetch-method) will not have `req` and `res`.</div>
