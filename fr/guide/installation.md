---
title: Installation
description: Démarrer avec Nuxt.js est vraiment facile. Un projet simple n'a besoin que d'une dépendance, `nuxt`.
---

> Démarrer avec Nuxt.js est vraiment facile. Un projet simple n'a besoin que d'une dépendance: `nuxt`.

## Utilisation du template de base de Nuxt.js

Afin de démarrer rapidement, l'équipe Nuxt.js a créé un [starter template](https://github.com/nuxt/starter).

[Télécharge le .zip](https://github.com/nuxt/starter/archive/source.zip) du *starter template* ou installe le l'aide de vue-cli:

```bash
$ vue init nuxt/starter <project-name>
```

> Si [vue-cli](https://github.com/vuejs/vue-cli) n'est pas installée, merci de l'installer via `npm install -g vue-cli`

puis install les dépendances:

```bash
$ cd <nom-du-projet>
$ npm install
```

et démarre le projet avec:
```bash
$ npm run dev
```
L'application est désormais accessible ici: [http://localhost:3000](http://localhost:3000)

<p class="Alert">Nuxt.js surveille les modifications faites sur les fichiers du répertoire `pages`; pas besoin de redémarrer le serveur quand vous ajoutez de nouvelles pages</p>

Pour en savoir plus sur la structure des dossier du projet: [Directory Structure Documentation](/guide/directory-structure).

## Commencer depuis zéro

La création d'une application Nuxt.js à partir de zéro est également très simple, elle ne nécessite qu'*1 fichier et 1 répertoire*. Créez un répertoire vide pour commencer à travailler sur l'application:

```bash
$ mkdir <nom-du-projet>
$ cd <nom-du-projet>
```

*Info: remplace nom-du-projet par le nom du projet.*

### package.json

Le projet a besoin d'un fichier `package.json` avec un script permettant de lancer `nuxt`:
```json
{
  "name": "mon-application",
  "scripts": {
    "dev": "nuxt"
  }
}
```
`scripts` lancera Nuxt.js via `npm run dev`.

### Installation de `nuxt`

Une fois que `package.json` est créé, ajoutez `nuxt` au projet via npm:
```bash
npm install --save nuxt
```

### Le dossier `pages`

Nuxt.js transforme chaque fichier `*.vue` se trouvant dans le dossier `pages` en une route pour l'application.

Créez le dossier `pages`:
```bash
$ mkdir pages
```

puis créez la première page `pages/index.vue`:
```html
<template>
  <h1>Hello world!</h1>
</template>
```

puis lancez le projet:
```bash
$ npm run dev
```
L'application est désormais accessible ici: [http://localhost:3000](http://localhost:3000)

<p class="Alert">Nuxt.js surveille les modifications faites sur les fichiers du répertoire `pages`; pas besoin de redémarrer le serveur quand vous ajoutez de nouvelles pages</p>

Pour en savoir plus sur la structure des dossier du projet: [Directory Structure Documentation](/guide/directory-structure).
