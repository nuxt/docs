# Pour traduire la documentation de nuxt

### Workflow de travail

Cette branche de travail `working` est volontairement mise en avant et doit uniquement être mise à jour dans le sens :

`nuxt/docs:master` --> `vuejs-fr/nuxt:working`.

Nous traduisons les fichiers directement dans le dossier `en` sans les renommer. Cela permet lors de la mise à jour de la documentation via l'utilisation des commandes :

Démarrer un serveur de développement sur `localhost:4000` :

```bash
npm install
npm run dev
```

d'obtenir des conflits **sur les pages déjà traduites** et ainsi maintenir la documentation à jour en fonction des modifications à travers **les documents déjà traduits**.

### Traduction

Pour savoir ce qui est [en cours de traduction](https://github.com/vuejs-fr/nuxt/issues/1) ou [comment traduire un fichier](https://github.com/vuejs-fr/nuxt/issues/2), référez vous aux issues correspondantes.

### Reverssement

Quand un fichier traduit est validé par pull request, on le met à jour dans le dossier `fr` de `vuejs-fr/nuxt:master` puis on propose une pull request au site principal :

`vuejs-fr/nuxt:master` --> `nuxt/docs:dev`

ainsi le dossier officiel hébergeant la documentation possède bien le dossier `fr` en français et le dossier `en` en anglais.

<<<<<<< HEAD
Note : il peut être intéressant de faire une pull request par ficher validé et donc de créer une branche dérivée de `vuejs-fr/nuxt:master` pour faire la pull request (`vuejs-fr/nuxt:master` --> `vuejs-fr/nuxt:only_one_changed_file_from_master` --> `vuejs/nuxt:master`)
=======
* Translation Repo — [/o2team/i18n-cn-nuxtjs-docs](https://github.com/o2team/i18n-cn-nuxtjs-docs)
* Primary maintainer - [AOTU Labs](https://aotu.io)
* Primary translator - [Levin Wong](http://faso.me), [Edward Chu](https://github.com/chuyik)

### Japanese

Japanese translation is maintained by INOUE Takuya.

* Translation Repo — [/inouetakuya/ja.docs.nuxtjs](https://github.com/inouetakuya/ja.docs.nuxtjs)
* Primary maintainer - [INOUE Takuya](http://blog.inouetakuya.info/)
* Primary translator - [INOUE Takuya](https://github.com/inouetakuya)

### Korean

Korean translation is maintained by Taewoong La.

* Translation Repo — [/DiyLecko/ko.docs.nuxtjs](https://github.com/DiyLecko/ko.docs.nuxtjs)
* Primary maintainer - [Taewoong La](http://blog.naver.com/diy_lecko)
* Primary translator - [june](http://jicjjang.github.io), [wanybae](https://github.com/wanybae), [rellario](https://github.com/rellario)

### French

French translation is maintained by [Vuejs-FR](https://github.com/vuejs-fr/nuxt/issues/1) Team.

* Translation Repo — [/vuejs-fr/nuxt](https://github.com/vuejs-fr/nuxt)
* Primary maintainer - [Bruno Lesieur](https://www.lesieur.name/) ([Orchard ID](https://www.orchard-id.com/))
* Primary translator - [Julien Grünhagel](https://rspt.io/) ([laruche](https://laruche.io))

### Want to help with the translation?

[gl]: https://gitlocalize.com
[gl-help]: https://docs.gitlocalize.com/ 
[gl-issue-tracker]: https://github.com/gitlocalize/feedback
[gl-repo]: https://gitlocalize/repo/100

We are useing with a translation tool called [GitLocalize][gl] and follow the steps to get started with your contribution:

1. Go to [GitLocalize's nuxt/docs repository][gl-repo].
1. Sign up using your GitHub account :octocat:.
1. Find the document you are going to translate. 
1. Happy translating :sparkles: .
1. When you are done, send the translation for reviews.
1. Reviewed translation will be sent as a Pull Request to GitHub by language admin in the community.

To learn more about how GitLocalize works, visit their [help page][gl-help]. If you find any issues or feature requests, please file them in [GitLocalize's issue tracker][gl-issue-tracker].
>>>>>>> upstream/master
