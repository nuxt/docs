---
title: Struktura direktorijuma
description: Podrazumevana struktura aplikacije Nuxt.js ima za cilj da obezbedi odličnu polaznu tačku za male i velike aplikacije. Naravno slobodni ste da organizujete svoju aplikaciju po želji.
---

> Podrazumevana struktura aplikacije Nuxt.js ima za cilj da obezbedi odličnu polaznu tačku za male i velike aplikacije. Naravno slobodni ste da organizujete svoju aplikaciju po želji.

## Direktorijumi

### Assets direktorijum

`assets` direktorijum sadrži nekomprimirane (eng. un-compiled) resurse kao što su Stylus ili Sass datoteke, slike, ili fontove.

[Za više detalja o implemetaciji Assets direktorijuma](/guide/assets)

### Components direktorijum

`components` direktorijum sadrži vaše Vue.js komponente. Na ovim mestima Nuxt.js ne dozvoljava korišćenje metode za podatke.

### Layouts direktorijum

`layouts` direktorijum uključuje izgled vaše aplikacije. Layouts se koristi da promeni izgled odnosno da postavi opšti izgled vaše aplikacije (na primer uključivanjem header, sidebar, footer).

[Za više detalja o implemetaciji Layouts direktorijuma](/guide/views#layouts)

_Ovaj direktorijum ne može se preimenovati bez dodatne konfiguracije._

### Middleware direktorijum

`middleware` direktorijum sadrži naše middlewares. Middleware u bukvalnom prevodu na srpski označava srednji softver koji vam omogućava da definišete funkciju koja će se izvršiti pre nego što se stranica ili grupa stranica(layouts) ne prikaže.

[Za više detalja o implemetaciji Middleware direktorijuma](/guide/routing#middleware)

### Pages direktorijum

`pages` direktorijum sadrži vaše poglede (eng. View) i rute (eng. Routes) aplikacije. Framework čita sve `.vue` datoteke unutar ovog direktorija i kreira rute za aplikaciju.

_Ovaj direktori ne možese preimenovati bez dodatne konfiguracije._

[Za više detalja o implemetaciji Pages direktorijuma](/guide/views)

### Plugins direktorijum

U direktorijumu `plugins` nalaze se vaši dodaci (eng. plugins) za Javascript koji želite da pokrenete pre nego što instancirate root Vue.js aplikaciju. Ovo je mesto za registraciju komponenti globalno i ubrizgavanje funkcija ili konstanti.

[Za više detalja o implemetaciji Plugins direktorijuma](/guide/plugins)

### Static direktorijum

`static` direktorijumu je direkto mapiran na root server (`/static/robots.txt` je dostupan kao `http://localhost:3000/robots.txt`) i sadrži datoteke koje se verovatno neće promeniti (tj. favicon)

**Primer:** `/static/robots.txt` je mapiran kao `/robots.txt`

_Ovaj direktori ne možese preimenovati bez dodatne konfiguracije._

[Za više detalja o implemetaciji Static direktorijuma](/guide/assets#static)

### Store direktorijum

`store` direktorijum sadrži vaše [Vuex Store](http://vuex.vuejs.org/en/) datoteke. Vuex Store se opciono implementiraju u framework Nuxt.js. Kreiranje `index.js` datoteke u ovom direktoriju automatski omogućava opciju u framework.

_Ovaj direktori ne možese preimenovati bez dodatne konfiguracije._

[Za više detalja o implemetaciji Store direktorijuma](/guide/vuex-store)

### Nuxt.config.js datoteka

`nuxt.config.js` datoteka sadrži vašu Nuxt.js prilagođenu konfiguraciju.

_Ovaj direktori ne možese preimenovati bez dodatne konfiguracije._

[Za više detalja o implemetaciji `nuxt.config.js` datoteke](/guide/configuration)

### Package.json datoteka

`package.json` datoteka sdrži vaše zavisnosti i skripte vaše aplikacije.

_Ova datoteka se ne može preimenovati._

## Aliases

| Alias | Direktorij |
|-----|------|
| `~` ili `@` | [srcDir](/api/configuration-srcdir) |
| `~~` ili `@@` | [rootDir](/api/configuration-rootdir) |

Podrazumevano, `srcDir` je isto kao `rootDir`.

<div class="Alert Alert--nuxt-green">

<b>Info:</b> U okviru `vue` šablona (eng. templates), ako želite da linkujete svoj `assets` ili `static` direktorij, koristite `~/assets/your_image.png` i `~/static/your_image.png`.

</div>
