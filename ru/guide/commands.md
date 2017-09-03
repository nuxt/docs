---
title: Commands and Deployment
description: Nuxt.js comes with a set of useful commands, both for development and production purpose.
---

> Nuxt.js comes with a set of useful commands, both for development and production purpose.

## List of Commands

| Command         | Description                                                                                |
|-----------------|--------------------------------------------------------------------------------------------|
| nuxt            | Launch a development server on [localhost:3000](http://localhost:3000) with hot-reloading. |
| nuxt build      | Build your application with webpack and minify the JS & CSS (for production).              |
| nuxt start      | Start the server in production mode (After running `nuxt build`).                          |
| nuxt generate   | Build the application and generate every route as a HTML file (used for static hosting).   |

#### Arguments
You can use `--help` with any command to get detailed usage. Common arguments are:

- **`--config-file` or `-c`:** Specify path to `nuxt.config.js` file.
- **`--spa` or `-s`:** Runs command in SPA mode by disabling server side rendering.

#### Using in package.json

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

**PRO TIP:** To pass arguments to npm commands, you need an extra `--` after script name (example: `npm run dev -- --spa`)

## Development Environment

To launch Nuxt in development mode with the hot reloading:

```bash
nuxt
// OR
npm run dev
```

## Production Deployment

Nuxt.js lets your choose between 3 modes to deploy your application: Server Rendered, SPA or Static Generated.

### Server Rendered Deployment (Universal)

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

### Static Generated Deployment (Pre Rendered)

Nuxt.js gives you the possibility to host your web application on any static hosting.

To generate our web application into static files:

```bash
npm run generate
```

It will create a `dist` folder with everything inside ready to be deployed on a static hosting.

If you have a project with [dynamic routes](/guide/routing#dynamic-routes), take a look at the [generate configuration](/api/configuration-generate) to tell nuxt.js how to generate these dynamic routes.

<div class="Alert">When generating your web application with `nuxt generate`, [the context](/api/context) given to [data()](/guide/async-data#the-data-method) and [fetch()](/guide/vuex-store#the-fetch-method) will not have `req` and `res`.</div>

### Single Page Application Deployment (SPA)

`nuxt generate` still needs SSR engine during build/generate time
While having the pro that all of our pages are pre rendered and having a high SEO and page load score, 
the content is generated at *build time*. For example, we can't use it for applications
where content depends on user authentication or a real time API (at least for the first load).

The SPA idea is simple! When spa mode is enabled using `mode: 'spa'` or `--spa` flag and we run build,
generation automatically starts after the build, but this time without pages content and only common meta and resource links.

So for an SPA deployment:
 - Change `mode` in `nuxt.config.js` to `spa` 
 - Run `npm run build`
 - Deploy the created `dist/` folder to your static hosting like surge or github pages or nginx.

Another possible deployment is that we can use nuxt as a middleware in frameworks while mode is `spa`.
This helps reduce server loads and using nuxt in projects where SSR is not possible.


<div class="Alert">See [FAQ/Deployments](/faq/heroku-deployment) for examples of deployment to popular hosts.</div>

