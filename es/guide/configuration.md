---
title: Configuración
description: La configuración por defecto de Nuxt.js cubre la mayoría de usos. Sin embargo, el archivo nuxt.config.js te deja sobreescribirlo.
---

> La configuración por defecto de Nuxt.js cubre la mayoría de usos. Sin embargo, el archivo nuxt.config.js te deja sobreescribirlo.

### build

Esta opción te permite añadir módulos dentro del archivo vendor.bundle.js generado para reducir el tamaño del app. Es bastante útil cuando se usa módulos externos.

[Documentación acerca de la integración de la construcción](/api/configuration-build)

### cache

Esta opción habilita los componentes en caché para mejorar el rendimiento de renderizado.

[Documentación acerca de la integración de cache](/api/configuration-cache)

### css

Esta opción te permite definir los archivos/módulos/librerías CSS que quieras establecer como globales (incluido en cada página).

[Documentación acerca de la integración de css](/api/configuration-css)

### dev

Esta opción te permite definir el modo de desarrollo o producción de nuxt.js

[Documentación acerca de la integración de dev](/api/configuration-dev)

### env

Esta opción te permite definir las variables de entorno disponibles para el cliente y servidor.

[Documentación acerca de la integración de env](/api/configuration-env)

### generate

Esta opción te permite definir cada valor de parámetros disponible para cada ruta dinámica en tu aplicación que Nuxt.js transforma en archivos HTML.

[Documentación acerca de la integración de generate](/api/configuration-generate)

### head

Esta opción te permite definir todas las etiquetas "meta" por defecto para tu aplicación.

[Documentación acerca de la integración de head](/api/configuration-head)

### loading

Esta opción te permite personalizar la carga del componente de carga predeterminado con Nuxt.js.

[Documentación acerca de la integración de loading](/api/configuration-loading)

### plugins

Esta opción te permite definir los plugins en Javascript para ser ejecutados antes de instanciar la aplicación vue.js de origen.

[Documentación acerca de la integración de plugins](/api/configuration-plugins)

### rootDir

Esta opción te permite definir el área de trabajo de tu aplicación nuxt.js.

[Documentación acerca de la integración de rootDir](/api/configuration-rootdir)

### router

Esta opción te permite sobreescribir la configuración predeterminada de vue-router en Nuxt.js.

[Documentación acerca de la integración de router](/api/configuration-router)

### srcDir

Esta opción te permite definir el directorio fuente de tu aplicación nuxt.js.

[Documentación acerca de la integración de srcDir](/api/configuration-srcdir)

### transition

Esta opción te permite definir las propiedades por defecto de las transiciones de página.

[Documentación acerca de la integración de transition](/api/configuration-transition)
