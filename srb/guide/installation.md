---
title: Instalacija
description: Početak sa Nuxt.js je stvarno lak. Jednostavan projekat zahteva samo `nuxt` zavisnost.
---

> Početak sa Nuxt.js je stvarno lak. Jednostavan projekat zahteva samo `nuxt` zavisnost.

## Koristite osnovni šablon Nuxt.js

Da bi brzo započeli sa razvojem naše aplikacije, tim Nuxt.js je kreirao šablon za pokretanje [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Proveri te da li imate instaliran [npx](https://www.npmjs.com/package/npx) (`npx` se isporučuje po difoltu od NPM `5.2.0` verzije)

```bash
$ npx create-nuxt-app <project-name>
```

Ili sa [yarn](https://yarnpkg.com/en/):

```bash
yarn create nuxt-app <my-project>
```

Biće vam postavljena neka pitanja:

1. Izaberite jedan od integrisanih okvira za server:
  - None (Nuxt podrazumevani server)
  - [Express](https://github.com/expressjs/express)
  - [Koa](https://github.com/koajs/koa)
  - [Hapi](https://github.com/hapijs/hapi)
  - [Feathers](https://github.com/feathersjs/feathers)
  - [Micro](https://github.com/zeit/micro)
  - [Adonis](https://github.com/adonisjs/adonis-framework) (WIP)
2. Izaberite vaš omiljeni UI framework:
  - None (slobodno ga dodajte kasnije)
  - [Bootstrap](https://github.com/bootstrap-vue/bootstrap-vue)
  - [Vuetify](https://github.com/vuetifyjs/vuetify)
  - [Bulma](https://github.com/jgthms/bulma)
  - [Tailwind](https://github.com/tailwindcss/tailwindcss)
  - [Element UI](https://github.com/ElemeFE/element)
  - [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)
  - [Buefy](https://buefy.github.io)
3. Izaberite Nuxt mod koji želite (`Universal` ili `SPA`)
4. Dodajte [axios module](https://github.com/nuxt-community/axios-module) da bi ste HTTP zahteve učinili lakšim u vašoj aplikaciji.
5. Dodajte [EsLint](https://eslint.org/) da vaš kod učini kozistentnim.
5. Dodajte [Prettier](https://prettier.io/) da bi vaš kod bio lepo formatiran.

Kada odgovorite na pitanja, instaliraće sve zavisnosti, pa je sledeći korak pokretanje projekta pomoću:

```bash
$ npm run dev
```

Aplikacija se pokreće na http://localhost:3000. Podrazumevano aplikacija osluškuje zahteve na portu :3000 kako bi izbegla konflikt sa drugim aplikacijama.

<div class="Alert">

Nuxt.js će osluškivati izmene datoteka unutar <code>pages</code> direktorijuma, tako da nema potrebe za ponovnim pokretanjem aplikacije prilikom dodavanja novih stranica.

</div>

Saznajte više o strukturi direktorijuma: [Struktora direktorijuma Dokumentacija](/guide/directory-structure).

## Kreiranje od nule

Kreiranje Nuxt.js aplikacije od nule je takođe veoma jednostavno, potreban mu je *1 datoteka i 1 direktorijum*. Za početak kreiraj prazan direktorijum:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

<div class="Alert Alert--nuxt-green">

<b>Informacija:</b> umesto <code>&lt;project-name&gt;</nom-du-projet></code> stavite vaš naziv projekta.

</div>

### Package.json

Projektu je potrebna `package.json` datoteka koja određuje kako da startuje `nuxt`:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`scripts` će pokrenuti Nuxt.js preko `npm run dev`.

### Instaliranje `nuxt`

Kada je `package.json` kreiran, dodajte `nuxt` projektu preko npm:

```bash
npm install --save nuxt
```

### Kreiranje `pages` direktorijuma

Nuxt.js će transformisati svaku `*.vue` datoteku unutar `pages` direktorijuma kao rutu aplikacije.

Kreiraj `pages` direktorijum:

```bash
$ mkdir pages
```

zatim kreirajte prvu stranicu unutar `pages/index.vue`:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

pokrenite projekat pomoću:

```bash
$ npm run dev
```

Aplikacija se pokreće na http://localhost:3000.

<div class="Alert">

Nuxt.js će osluškivati izmene datoteka unutar <code>pages</code> direktorijuma, tako da nema potrebe za ponovnim pokretanjem aplikacije prilikom dodavanja novih stranica.

</div>

Saznajte više o strukturi direktorijuma: [Struktora direktorijuma Dokumentacija](/guide/directory-structure).
