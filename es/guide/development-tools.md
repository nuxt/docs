---
title: Herramientas de Desarrollo
description: Nuxt.js hace tu desarrollo web más agradable.
---

> Probar tu aplicación es parte del desarrollo web. Nuxt.js te ayuda a hacerlo lo más fácil posible.

## Pruebas End-to-End

[Ava](https://github.com/avajs/ava) es un poderoso framework de prueba en JavaScript, combinado con [jsdom](https://github.com/tmpvar/jsdom), podemos usarlos para hacer pruebas end-to-end fácilmente.

Primero, necesitamos agregar 'ava' y 'jsdom' como dependencias de desarrollo:
```bash
npm install --save-dev ava jsdom
```

Y agregamos un "script" "test" a nuestro `package.json` y configuramos ava para compilar archivos que importamos en nuestros tests:

```javascript
"scripts": {
  "test": "ava",
   "ava": {
     "require": [
       "babel-register"
     ]
   },
   "babel": {
     "presets": [
       "es2015"
     ]
   }
}
```

Vamos a escribir nuestras pruebas en la carpeta `test`:
```bash
mkdir test
```

Digamos que tenemos una página en `pages/index.vue`:
```html
<template>
  <h1 class="red">Hola {{ name }}!</h1>
</template>

<script>
export default {
  data () {
    return { name: 'mundo' }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>
```

Cuando lanzamos nuestra aplicación con `npm run dev` y abrimos [http://localhost:3000](http://localhost:3000), podemos ver nuestro título rojo `Hola mundo!`.

Agregamos nuestro archivo de prueba `test/index.test.js`:

```js
import test from 'ava'
import Nuxt from 'nuxt'
import { resolve } from 'path'

// Mantenemos la instancia de nuxt y del servidor
// Entonces podemos cerrarlos al final de la prueba
let nuxt = null
let server = null

// Inicia Nuxt.js y crea un servidor escuchando en localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // carpeta del proyecto
  config.dev = false // "build" de producción
  nuxt = new Nuxt(config)
  await nuxt.build()
  server = new nuxt.Server(nuxt)
  server.listen(4000, 'localhost')
})

// Ejemplo de prueba generando solo html
test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})

// Ejemplo de prueba vía "dom checking"
test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Cierra el servidor y pide a nuxt que deje de escuchar los cambios en los archivos
test.after('Closing server and nuxt.js', t => {
  server.close()
  nuxt.close()
})
```

Ahora podemos lanzar nuestras pruebas:
```bash
npm test
```

"jsdom" tiene algunas limitaciones porque no usa un navegador. Sin embargo, cubrirá gran parte de nuestras pruebas. Si quieres usar un navegador para probar tu aplicación, quizás quieres revisar [Nightwatch.js](http://nightwatchjs.org).

## ESLint

> ESLint es una gran herramienta para mantener tu código limpio

Puedes agregar [ESLint](http://eslint.org) bastante fácil con nuxt.js, primero, necesitas agregar las dependencias npm:

```bash
npm install --save-dev babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard
```

Luego, puedes configurar ESLint vía un archivo `.eslintrc.js` en el directorio origen de tu proyecto:
```js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // requerido para "lint" los archivos *.vue 
  plugins: [
    'html'
  ],
  // agrega tus reglas personalizadas aquí
  rules: {},
  globals: {}
}
```

Después, puedes agregar un script `lint` en tu  `package.json`:

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
}
```

Ahora puedes lanzar:
```bash
npm run lint
```

ESLint revisará(lint) cada archivo en JavaScript y Vue mientras ignora tus archivos ignorados definidos en `.gitignore`.

<p class="Alert Alert--info">Lo mejor que puedes hacer es también agregar `"precommit": "npm run lint"` en tu package.json para revisar (lint) tu código automáticamente antes de confirmarlo (commit).</p>
