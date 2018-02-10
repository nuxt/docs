---
title: Commands and Deployment
description: Nuxt.js hadir dengan seperangkat perintah yang berguna, baik untuk tujuan
  pengembangan maupun produksi.
---

> Nuxt.js hadir dengan seperangkat perintah yang berguna, baik untuk tujuan pengembangan maupun produksi.

## Daftar Perintah

Perintah | Penjelasan
--- | ---
nuxt | Launch a development server on localhost:3000 with hot-reloading.
nuxt build | Build your application with webpack and minify the JS & CSS (for production).
nuxt start | Start the server in production mode (after running `nuxt build`).
nuxt generate | Build the application and generate every route as a HTML file (used for static hosting).

#### Argumen

You can use `--help` with any command to get detailed usage. Common arguments are:

- **`--config-file` or `-c`:** specify the path to `nuxt.config.js` file.
- **`--spa` or `-s`:** Runs command in SPA mode by disabling server side rendering.

#### Menggunakan di package.json

Anda harus memasukkan perintah ini ke dalam `package.json`:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

Kemudian, Anda bisa menjalankan perintah Anda melalui `npm run <command>` (contoh : `npm run dev`).

<p class="Alert Alert--nuxt-green"><b>Pro tip:</b> to pass arguments to npm commands, you need an extra <code>--</code> script name (example: <code>npm run dev -- --spa</code>).</p>

## Development Environment

Untuk meluncurkan Nuxt dalam mode pengembangan dengan hot reloading:

```bash
nuxt
// OR
npm run dev
```

## Production Deployment

Nuxt.js memungkinkan Anda memilih antara tiga mode untuk menerapkan aplikasi Anda: Server Rendered, SPA atau Static Generated.

### Server Rendered Deployment (Universal)

To deploy, instead of running `nuxt`, you probably want to build ahead of time. Therefore, building and starting are separate commands:

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

Nuxt.js memberi Anda kemampuan untuk meng-host aplikasi web Anda pada hosting statis manapun.

Untuk menghasilkan aplikasi web kita menjadi file statis:

```bash
npm run generate
```

It will create a `dist` folder with everything inside ready to be deployed on a static hosting site.

If you have a project with [dynamic routes](/guide/routing#dynamic-routes), take a look at the [generate configuration](/api/configuration-generate) to tell Nuxt.js how to generate these dynamic routes.

<div class="Alert">When generating your web application with `nuxt generate`, [the context](/api/context) given to [data()](/guide/async-data#the-data-method) and [fetch()](/guide/vuex-store#the-fetch-method) will not have `req` and `res`.</div>

### Single Page Application Deployment (SPA)

`nuxt generate` still needs SSR engine during build/generate time while having the advantage of having all our pages pre rendered, and have a high SEO and page load score. The content is generated at *build time*. For example, we can't use it for applications where content depends on user authentication or a real time API (at least for the first load).

The SPA idea is simple! When SPA mode is enabled using `mode: 'spa'` or `--spa` flag, and we run build, generation automatically starts after the build. This generation contains common meta and resource links, but not page content.

So, for an SPA deployment, you must do the following:

- Ubah `mode` di `nuxt.config.js` ke `spa`.
- Jalankan `npm run build`.
- Deploy the created `dist/` folder to your static hosting like Surge, GitHub Pages or nginx.

Another possible deployment method is to use Nuxt as a middleware in frameworks while in `spa` mode. This helps reduce server load and uses Nuxt in projects where SSR is not possible.

<div class="Alert">See [How to deploy on Heroku?](/faq/heroku-deployment) for examples of deployment to popular hosts.</div>

<div class="Alert">See [How to deploy on GitHub Pages?](/faq/github-pages) for more details on how to deploy to GitHub Pages.</div>
