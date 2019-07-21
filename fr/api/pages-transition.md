---
title: "API : la propriété pageTransition (EN)"
description: Nuxt.js utilise le composant de `<transition>` afin de créer des transitions / animations époustouflantes entre vos pages.
---

# La propriété pageTransition (EN)

> Nuxt.js v2.7+ introduit `pageTransition` en lieu et place de `transition` pour améliorer le nommage avec les transitions de mise en page. Avec Nuxt 3, `transition` sera dérpécié.

- **Type :** `String` ou `Object` ou `Function`

Pour définir une transition personnalisée pour une route spécifique, ajoutez la propriété `pageTransition` au composant de page.

```js
export default {
  // Peut-être une chaine de caractères
  pageTransition: ''
  // Ou un objet
  pageTransition: {}
  // Ou une fonction
  pageTransition (to, from) {}
}
```

## Chaine de caractères

Si la propriété `pageTransition` est définie en tant que chaine de caractère, elle sera utilisée comme `transition.name`.

```js
export default {
  pageTransition: 'test'
}
```

Nuxt.js utilisera ces paramètres pour définir le composant comme suit :

```html
<transition name="test">
```

## Objet

Si la propriété `pageTransition` est un objet :

```js
export default {
  pageTransition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js utilisera ces paramètres pour définir le composant comme suit :

```html
<transition name="test" mode="out-in">
```

L'objet `pageTransition` peut avoir les propriétés suivantes :

| Propriété          | type      | défaut     | définition                                                                                                                                                                                                                                         |
|--------------------|-----------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`             | `String`  | `"page"`   | Le nom de la transition appliqué aux transitions de route.                                                                                                                                                                                         |
| `mode`             | `String`  | `"out-in"` | Le mode de la transition appliqué aux routes. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Les-modes-de-transition).                                                                                              |
| `css`              | `Boolean` | `true`     | Défini s'il faut utiliser les transitions de classes CSS. Par défaut à `true`. Si mis à `false`, cela ne déclenchera que les points d'ancrage JavaScript abonnés via les évènements de composant.                                                       |
| `duration`         | `Integer` | aucune     | La durée (en millisecondes) appliquée a une transition, voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Durees-de-transition-explicites).                                                                             |
| `type`             | `String`  | aucune     | Spécifie le type d'évènement de transition attendu pour déterminer le moment de fin de transition. Les valeurs disponibles sont `"transition"` et `"animation"`. Par défaut, cela sera automatiquement déterminé s'il n'y a pas de durée précisée. |
| `enterClass`       | `String`  | aucune     | L'état de départ de la classe de transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                                  |
| `enterToClass`     | `String`  | aucune     | L'état final de la transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                                                |
| `enterActiveClass` | `String`  | aucune     | La classe appliquée pendant l'intégralité de la transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees)                                                                    |
| `leaveClass`       | `String`  | aucune     | L'état de départ de la classe de transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                                  |
| `leaveToClass`     | `String`  | aucune     | L'état final de la transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                                                |
| `leaveActiveClass` | `String`  | aucune     | La classe appliquée pendant l'intégralité de la transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                   |

Vous pouvez également définir des méthodes dans l'objet `pageTransition` afin de pouvoir utiliser des [points d'ancrage JavaScript](https://fr.vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) :

- `beforeEnter(el)`
- `enter(el, done)`
- `afterEnter(el)`
- `enterCancelled(el)`
- `beforeLeave(el)`
- `leave(el, done)`
- `afterLeave(el)`
- `leaveCancelled(el)`

*Note : c'est une bonne pratique que de définir explicitement `css: false` pour les transitions uniquement JavaScript afin que Vue passe la détection CSS. Cela prévient également les potentielles interférences entre les déclarations CSS.*

### Transition Mode (EN)

**The default transition mode for pages differs from the default mode in Vue.js**. The `pageTransition` mode is by default set to `out-in`. If you want to run leaving and entering transitions simultaneously, you have to set the mode to the empty string `mode: ''`. 

```js
export default {
  pageTransition: {
    name: 'test',
    mode: ''
  }
}
```

## Fonction

Si la propriété `pageTransition` est une fonction :

```js
export default {
  pageTransition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

Transitions appliquées à la navigation :

- `/` vers `/posts` => `slide-left`,
- `/posts` vers `/posts?page=3` => `slide-left`,
- `/posts?page=3` vers `/posts?page=2` => `slide-right`.

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
