---
title: "API: la propriété transition"
description: Nuxt.js utilise le composant transition afin de créer des transitions/animations époustouflantes entre vos pages.
---

# La propriété transition

> Nuxt.js utilise le composant [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) afin de créer des transitions/animations époustouflantes entre vos pages.

- **Type:** `String` ou `Object` ou `Function`

Pour définir une transition personalisée pour une route spécifique, ajouter la clef `transition` au composant de page.

```js
export default {
  // Can be a String
  transition: ''
  // Or an Object
  transition: {}
  // or a Function
  transition (to, from) {}
}
```

## String

Si la clef `transition` est défini en tant que string, il sera utilisé comme `transition.name`.

```js
export default {
  transition: 'test'
}
```

Nuxt.js utilisera ces paramètres pour définir le composant comme suit:

```html
<transition name="test">
```

## Objet

Si la clef `transition` est un objet:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js utilisera ces paramètres pour définir le composant comme suit:

```html
<transition name="test" mode="out-in">
```

L'objet `transition` peut avoir les propriétés suivantes:

| clef  | type | défaut | définition |
|------|------|---------|-----------|
| `name` | String | `"page"` | Le nom de la transition appliqué aux routes. |
| `mode` | String | `"out-in"` | Le mode de la transition appliqué aux routes; voir la [documentation Vue.js](http://vuejs.org/v2/guide/transitions.html#Transition-Modes). |
| `css` | Boolean | `true` | Whether to apply CSS transition classes. Defaults to `true`. If set to false, will only trigger JavaScript hooks registered via component events. |
| `duration` | Integer | `n/a` | The duration (in milliseconds) applied on the transition, see [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations). |
| `type` | String | `n/a` | Specify the type of transition events to wait for to determine transition end timing. Available values are "transition" and "animation". By default, it will automatically detect the type that has a longer duration. |
| `enterClass` | String | `n/a` | L'état de départ de la classe de transition. Voir la [documentation Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `enterToClass` | String | `n/a` | L'état final de la transition. Voir la [documentation Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `enterActiveClass` | String | `n/a` | La classe appliquée pendant l'intégralité de la transition. Voir la [documentation Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `leaveClass` | String | `n/a` | L'état de départ de la classe de transition. Voir la [documentation Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `leaveToClass` | String | `n/a` | L'état final de la transition. Voir la [documentation Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `leaveActiveClass` | String | `n/a` | La classe appliquée pendant l'intégralité de la transition. Voir la [documentation Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |

Vous pouvez également définir des méthodes dans l'objet `transition` afin de pouvoir utiliser des [hooks JavaScript](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks):

- beforeEnter(el)
- enter(el, done)
- afterEnter(el)
- enterCancelled(el)
- beforeLeave(el)
- leave(el, done)
- afterLeave(el)
- leaveCancelled(el)

*Note: c'est une bonne pratique que de définir explicitement `css: false` pour les transitions uniquement JavaScript afin que Vue passe la détection CSS. Cela prévient également les potentielles interférences entre les déclarations CSS.*

## Fonction

Si la clef `transition` est une fonction:

```js
export default {
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

Transitions appliquées à la navigation:
- `/` to `/posts` => `slide-left`
- `/posts` to `/posts?page=3` => `slide-left`
- `/posts?page=3` to `/posts?page=2` => `slide-right`
