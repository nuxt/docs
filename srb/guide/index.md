---
title: Introduction
description: "Nuxt.js je Framework za kreiranje Vue aplikacija, možete izabrati između Univerzalne, Statički generisane ili Single Page Aplikacije."
---

> Nuxt.js je framework za kreiranje Vue.js aplikacija, možete izabrati između Univerzalne, Statički generisane ili Single Page Aplikacije.

## Šta je Nuxt.js?

Njegova glavna svrha je **prikazivanje korisničkog interfejsa (« UI »)** tako što se zanemaruje raspodela između klijenta i servera.

Naš cilj je da kreiramo framework dovoljno fleksibilan da ga možete koristiti kao osnovu za vaš glavni projekat ili dodatak vašem trenutnom projektu koji je zasnovan na Node.js.

Nuxt.js predefiniše svu potrebnu konfiguraciju da bi vaš razvoj Vue.js Aplikacija **Server Rendered** bio ugodniji.

Pored toga, nudimo i drugu opciju koja se zove: *nuxt generate*. Ona će napraviti **Statički Generisanu** Vue.js Aplikaciju.
Verujemo da bi ova opcija mogla biti sledeći veliki korak u razvoju Web aplikacija sa mikro servisima.

Pored toga, možete takođe koristiti Nuxt.js za brzo kreirate single page aplikacije (`spa` mod), korisno je zadržati Nuxt funkcije tokom rada na backoffice aplikacijama.

Kao framework, Nuxt.js dolazi sa puno funkcija koje će vam pomoći u razvoju između klijentske i serverske strane kao što su Asynchronous Data, Middleware, Layouts, itd.

## Kako to funkcioniše

![Vue with webpack and Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js sadrži sledeće elemente kako bi stvorio optimalno iskustvo za razvoj:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) (uključen samo kada koristite [store option](/guide/vuex-store))
- [Vue Server Renderer](https://ssr.vuejs.org/en/) (isključeno prilikom korišćenja [`mode: 'spa'`](/api/configuration-mode))
- [vue-meta](https://github.com/declandewet/vue-meta)

Ukupna težina framework je samo **57kB min+gzip** (60kB sa Vuex).

Ispod haube koristimo [webpack](https://github.com/webpack/webpack) sa [vue-loader](https://github.com/vuejs/vue-loader) i [babel-loader](https://github.com/babel/babel-loader) za bundle, [code-split](https://webpack.js.org/guides/code-splitting/) i minify vašeg kòda.

## Karakteristike

- Pisanje Vue datoteka (`*.vue`)
- Automatski razdvajanje koda
- Server-side renderovanje
- Snažan sistem za rutiranje sa asihronim podacima
- Generisanje statičkih datoteka
- ES6/ES7 Transpilacija
- Pakovanje i minifikacija vaših JS i CSS datoteka
- Upravljanje `<head>` elementom, a to podrazumeva upravljanje i elementima kao što su (`<title>`, `<meta>`, itd.)
- Hot module replacement u razvoju app
- Priprocesor: Sass, Less, Stylus, itd.
- Zaglavlja HTTP/2 PUSH
- Proširenje sa modularnom arhitekturom

## Diagram

Ovaj diagram pokazuje ono što se poziva od strane Nuxt.js kada se pozove server ili kada korisnik koristi navigaciju u aplikaciju koja ima `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.png)

## Renderovanje na serveru (Universal SSR)

Možete koristiti Nuxt.js kao framework za upravljanje potpunim prikazivanjem korisničkog interfejsa u vašem projektu.

Koristeći `nuxt` komandu, Nuxt će pokrenuti razvojni server sa hot-reloading i [Vue Server render](https://ssr.vuejs.org/en/) će biti konfigurisan tako da automatski vrši renderovanje vaše aplikacije na serveru.

### Single Page Aplikacija (SPA)

Ako iz nekog razloga ne želite da koristite renderovanje na serveru ili vam je potreban statički hosting za vašu alikaciju, jednostavno možete koristiti SPA koristeći komandu `nuxt --spa`. U kombinaciji sa *generate* funkcijom, imate moćnu SPA aplikaciju koja ne zahteva Node.js ili poseban server za pokretanje.

Pogledajte listu [naredbi](/guide/commands) da biste saznali više.

Ako već imate server, možete dodati Nuxt.js kao middleware. Ne postoji ograničenje kada koristite Nuxt.js kako biste razvili vašu Univerzalnu (Universal SSR) Web Aplikaciju. Konsultujte [Programerski vodič Nuxt.js](/api/nuxt).

## Statičko Generisanje (Pre Rendering)

Velika inovacija Nuxt.js je njegova komanda `nuxt generate`.

Kada kreirate aplikaciju, on će generisati HTML kòd za svaku od vaših ruta i čuvati ga u datoteci.

Na primer, sledeća struktura datiteke:

```bash
-| pages/
----| about.vue
----| index.vue
```

Generiše:

```
-| dist/
----| about/
------| index.html
----| index.html
```

Na ovaj način možete da hostujete vašu statički generisanu web aplikaciju na bilo kom statičkom hostingu!

Najbolji primer je ova stranica. Ona je generisana i hostovana na [Netlify](https://www.netlify.com), pogledajte naš [source code](https://github.com/nuxt/nuxtjs.org).

Ne želimo da ručno generišemo aplikaciju svaki put kada ažuriramo [dokumentaciju](https://github.com/nuxt/docs), ona pokreće hook (kuku) da Netlify:

1. Klonira repozitorijum [nuxtjs.org](https://github.com/nuxt/nuxtjs.org)
2. Instalira zavisnosti (eng. dependencies ) preko  `npm install`
3. Pokrene `npm run generate`
4. Postavi `dist` direktorijum

Sada imamo automatizovanu **Statički Generisanu Web Aplikaciju** :)

Možemo ići i korak dalje zamišljanjem e-commerce web aplikacije kreirane `nuxt generate` i hostovane na CDN. Svaki put kada proizvod nije na lageru ili zalihama, obnavljamo odnosno regenerišemo aplikaciju. Ali ako korisnik istovremeno pregleda aplikaciju, on će videti informacije koje se ažuriraju preko API poziva napravljenih na e-commerce API-ju. Nije potrebno imati višestruke instance keširanja servera!

<div class="Alert">

Pogledajte [How to deploy on Netlify?](/faq/netlify-deployment) na ovom linku možete pročitati kako da dobijete brzo statički generisane Nuxt.js stranice.

</div>
