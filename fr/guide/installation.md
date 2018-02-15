---
title: Installation
description: Débuter avec Nuxt.js est vraiment facile. Un projet simple n'a besoin que d'une dépendance à `nuxt`.
---

> Débuter avec Nuxt.js est vraiment facile. Un projet simple n'a besoin que d'une dépendance à `nuxt`.

## Utiliser le template de base de Nuxt.js

Afin de démarrer rapidement, l'équipe Nuxt.js a créé un [template de démarrage](https://github.com/nuxt-community/starter-template).

[Téléchargez le .zip](https://github.com/nuxt-community/starter-template/archive/master.zip) du template de démarrage ou installez le à l'aide de vue-cli :

```bash
$ vue init nuxt-community/starter-template <project-name>
```

> Si [vue-cli](https://github.com/vuejs/vue-cli) n'est pas installée, merci de l'installer via `npm install -g vue-cli`

puis installez les dépendances :

```bash
$ cd <nom-du-projet>
$ npm install
```

et démarrez le projet avec :
```bash
$ npm run dev
```
L'application est désormais accessible à l'adresse http://localhost:3000.

<p class="Alert">Nuxt.js va surveiller les modifications faites sur les fichiers du répertoire <code>pages</code> aussi il n'y a pas besoin de redémarrer le serveur quand vous ajoutez de nouvelles pages.</p>

Pour en savoir plus sur l'organisation des répertoires dans un projet, consultez la documentation de l'[Architecture des répertoires](/guide/directory-structure).

## Commencer depuis zéro

La création d'une application Nuxt.js à partir de zéro est également très simple, elle ne nécessite qu'*1 fichier et 1 répertoire*. Créez un répertoire vide pour commencer à travailler sur l'application :

```bash
$ mkdir <nom-du-projet>
$ cd <nom-du-projet>
```

<p class="Alert Alert--nuxt-green"><b>Info :</b> remplacez <code>&lt;nom-du-projet&gt;</nom-du-projet></code> par le nom du projet.</p>

### Le package.json

Le projet a besoin d'un fichier `package.json` avec un script permettant de lancer `nuxt` :

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

Une fois que le `package.json` est créé, ajoutez `nuxt` au projet via npm :

```bash
npm install --save nuxt
```

### Le dossier `pages`

Nuxt.js va transformer chaque fichier `*.vue` se trouvant dans le dossier `pages` en une route pour l'application.

Créez le dossier `pages` :

```bash
$ mkdir pages
```

puis créez la première page `pages/index.vue`:

```html
<template>
  <h1>Hello world !</h1>
</template>
```

et lancez le projet avec :

```bash
$ npm run dev
```

L'application est désormais accessible à l'adresse http://localhost:3000.

<p class="Alert">Nuxt.js va surveiller les modifications faites sur les fichiers du répertoire <code>pages</code> aussi il n'y a pas besoin de redémarrer le serveur quand vous ajoutez de nouvelles pages</p>

Pour en savoir plus sur la structure des dossiers du projet, consultez la documentation de l'[Architecture des répertoires](/guide/directory-structure).
