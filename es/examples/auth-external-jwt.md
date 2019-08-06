---
title: Autentificacion con API Externa (JWT)
description: Ejemplo de autentififacion con un servicio de API externo (jsonwebtoken) con Nuxt.js
github: auth-jwt
code: https://github.com/ahadyekta/nuxt-auth-external-jwt
---

# Documentacion

En el ejemplo de rutas autentificadas tanto el api y nuxt comienzan usando una sola instancia del servidor Node.js. Sin embargo, algunas veces nosotros necesitamos trabajar con api extenas con jsonWebToken. En este ejemplo vas a explicar esto de manera simple.

## Oficial `auth-module`

Si usted desea implemente un complejo flujo de autentificacion por ejemplo OAuth2, nosotros sugerimos usar el oficial [`auth-module`](https://github.com/nuxt-community/auth-module)

## Estructura

Dado que Nuxt.js proporciona renderizado tanto del servidor como del cliente y la cookie del navegador es diferente de la cookie del servidor Node.js, deberíamos enviar los datos de token a algún almacenamiento al que se pueda acceder en ambos lados.

### Para el renderizado del servidor

Deberíamos guardar el token en la cookie de la sesion del navegador después de iniciar sesión, luego podemos acceder a través de `req.headers.cookie` en archivos de middleware, la funcion`nuxtServerInit` o donde sea que puedas acceder a el `req`.

### Para el renderizado del cliente

Nosotros vamos directamente a hacer un commit del token en el store, asi que mientras la pagina no sea cerrada o recargada, nosotros tendriamos el token.

Primero, nosotros vamos a instalar las dependencias:

```bash
npm install js-cookie --save
npm install cookieparser --save
```

## Pagina de Login

Bueno, dentro de la carpeta page crea un archivo `login.vue`, y dentro de la seccion del script, agrega:

```js
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  methods: {
    postLogin() {
      setTimeout(() => { // we simulate the async request with timeout.
        const auth = {
          accessToken: 'someStringGotFromApiServiceWithAjax'
        }
        this.$store.commit('setAuth', auth) // mutating to store for client rendering
        Cookie.set('auth', auth) // saving token in cookie for server rendering
        this.$router.push('/')
      }, 1000)
    }
  }
}
```

> Nota: vamos a simular una peticion asincrona usando timeout.

## Usando el store

Despues de crear el `index.js` en la carpeta `store` asi como el siguiente codigo :

```javascript
import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      auth: null
    }),
    mutations: {
      setAuth(state, auth) {
        state.auth = auth
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            auth = JSON.parse(parsed.auth)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setAuth', auth)
      }
    }
  })
}

export default createStore
```

> Nota: la funcion `nuxtServerInit` se ejecuta cada vez que renderizado del lado del servidor. Asi que nosotros vamos a usarlo para mutar el cookie de la sesion del navegador en el store. Nosotros vamos a obtener las cookies del navegador usando `req.headers.cookie` y parsearlo usando `cookieparser`.

## Comprobando los middlewares de autentificacion

Nosotros debemos comprobar que el store tenga el accessToken en cada pagina que necesitamos limitar su acceso. En la carpeta middleware vamos a crear el archivo `authenticated.js`:

```javascript
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.auth) {
    return redirect('/login')
  }
}
```

y en la carpeta middleware vamos a crear el archivo `notAuthenticated.js` para la pagina de login:

```javascript
export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (store.state.auth) {
    return redirect('/')
  }
}
```

> Nota: usamos el middleware `authenticated` para paginas que necesitan autentificacion y usamos el middleware `notAuthenticated` dentro de login/register y paginas similares.

## Desconexion del usuario
Finalmente para permitir al usuario a desconectar, nosotros debemos remover la cookie: 

```javascript
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  methods: {
    logout() {
      // Code will also be required to invalidate the JWT Cookie on external API
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
    }
  }
}
```

> Nota: usamos el metodo con @click="logout"

