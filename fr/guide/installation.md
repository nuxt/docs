---
title: Installation
description: Débuter avec Nuxt.js est vraiment facile. Un projet simple n'a besoin que d'une dépendance à `nuxt`.
---

> Débuter avec Nuxt.js est vraiment facile. Un projet simple n'a besoin que d'une dépendance à `nuxt`.

<div>
  <a href="https://vueschool.io/courses/nuxtjs-fundamentals/?friend=nuxt" target="_blank" class="Promote">
    <img src="/nuxt-fundamentals.png" srcset="/nuxt-fundamentals-2x.png 2x" alt="Fondamentaux de Nuxt par vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Fondamentaux de Nuxt.js</h4>
      <p class="Promote__Content__Description">Apprendre comment démarrer rapidement avec Nuxt.js en vidéos.</p>
      <p class="Promote__Content__Signature">Cours en vidéo réalisés par VueSchool pour aider au développement de Nuxt.js.</p>
    </div>
  </a>
</div>

## Utiliser `create-nuxt-app`

Afin de démarrer rapidement, l'équipe Nuxt.js a créé un outil de démarrage [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Assurez-vous que [npx](https://www.npmjs.com/package/npx) est installé (`npx` est livré par défaut depuis NPM `5.2.0`)

```bash
$ npx create-nuxt-app <project-name>
```

ou avec [yarn](https://yarnpkg.com/en/):

```bash
$ yarn create nuxt-app <project-name>
```

Il vous sera posé quelques questions (nom du projet, options de Nuxt, UI framework, TypeScript, linter, framework de test, etc.), après vos réponses données, les dépendences s'installeront et la prochaine étape sera de naviguer dans le dossier du projet pour le lancer avec :

```bash
$ cd <project-name>
$ npm run dev
```

L'application est désormais accessible à l'adresse http://localhost:3000.

<div class="Alert">

Nuxt.js va surveiller les modifications faites sur les fichiers du répertoire <code>pages</code> aussi il n'y a pas besoin de redémarrer le serveur quand vous ajoutez de nouvelles pages.

</div>

Pour en savoir plus sur l'organisation des répertoires dans un projet, consultez la documentation de l'[Architecture des répertoires](/guide/directory-structure).

## Commencer depuis zéro

La création d'une application Nuxt.js à partir de zéro est également très simple, elle ne nécessite qu'*1 fichier et 1 répertoire*. Créez un répertoire vide pour commencer à travailler sur l'application :

```bash
$ mkdir <nom-du-projet>
$ cd <nom-du-projet>
```

<div class="Alert Alert--nuxt-green">

<b>Info :</b> remplacez <code>&lt;nom-du-projet&gt;</nom-du-projet></code> par le nom du projet.

</div>

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
$ npm install --save nuxt
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
  <h1>Bonjour le monde !</h1>
</template>
```

et lancez le projet avec :

```bash
$ npm run dev
```

L'application est désormais accessible à l'adresse http://localhost:3000.

<div class="Alert">

Nuxt.js va surveiller les modifications faites sur les fichiers du répertoire <code>pages</code> aussi il n'y a pas besoin de redémarrer le serveur quand vous ajoutez de nouvelles pages

</div>

Pour en savoir plus sur la structure des dossiers du projet, consultez la documentation de l'[Architecture des répertoires](/guide/directory-structure).
