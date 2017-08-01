---
title: Views
description: The Views section describes all you need to configure data and views for a specific route in your Nuxt.js application. (Document, Layouts, Pages and HTML Head)
---
 
> The Views section describes all you need to configure data and views for a specific route in your Nuxt.js application. (Document, Layouts, Pages and HTML Head)

![nuxt-views-schema](/nuxt-views-schema.png)

## Document

> You can customise the main document with nuxt.js

To extend the html template, create a `app.html` at the root of your project.

The default template is:

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

One example if to add conditional CSS classes for IE:

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## Layouts

Nuxt.js lets you extend the main layout or create custom layouts by adding them in the `layouts` directory.

### Default Layout

You can extend the main layout by adding a `layouts/default.vue` file.

*Make sure to add the `<nuxt/>` component when creating a layout to display the page component.*

The default layout source code is:
```html
<template>
  <nuxt/>
</template>
```

### Error Page

You can customize the error page by adding a `layouts/error.vue` file.

This layout is special since you should not include `<nuxt/>` inside its template. You must see this layout as a component displayed when an error occurs (404, 500, etc).

The default error page source code is [available on GitHub](https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue).

Example of a custom error page in `layouts/error.vue`:
```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
```

### Custom Layout

Every file (*first level*) in the `layouts` directory will create a custom layout accessible with the `layout` property in the page component.

*Make sure to add the `<nuxt/>` component when creating a layout to display the page component.*

Example of `layouts/blog.vue`:
```html
<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt/>
  </div>
</template>
```

And then in `pages/posts.vue`, you can tell Nuxt.js to use your custom layout:
```html
<script>
export default {
  layout: 'blog'
}
</script>
```

More information about the layout property: [API Pages layout](/api/pages-layout)

Check the [demonstration video](https://www.youtube.com/watch?v=YOKnSTp7d38) to see it in action.

## Pages

Every Page component is a Vue component, but Nuxt.js adds special keys to make the development of your universal application the easiest way possible.

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  asyncData (context) {
    // called every time before loading the component
    return { name: 'World' }
  },
  fetch () {
    // The fetch method is used to fill the store before rendering the page
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```


| Attribute | Description |
|-----------|-------------|
| asyncData | The most important key, it can be asynchronous and receives the context as argument, please read the [async data documentation](/guide/async-data) to learn how it works. |
| fetch | Used to fill the store before rendering the page, it's like the data method except it doesn't set the component data. See the [API Pages fetch documentation](/api/pages-fetch). |
| head | Set specific Meta Tags for the current page, see [API Pages head documentation](/api/pages-head). |
| layout | Specify a layout defined in the `layouts` directory, see [API Pages layouts documentation](/api/pages-layout). |
| transition | Set a specific transition for the page, see [API Pages transition](/api/pages-transition). |
| scrollToTop | Boolean, by default: `false`. Specify if you want the page to scroll to the top before rendering the page, it's used for [nested routes](/guide/routing#nested-routes). |
| validate | Validator function for a [dynamic route](/guide/routing#dynamic-routes). |
| middleware | Set a middleware for this page, the middleware will be called before rendering the page, see [routes middleware](/guide/routing#middleware). |

More information about the pages properties usage: [API Pages](/api)

## HTML Head

Nuxt.js uses [vue-meta](https://github.com/declandewet/vue-meta) to update the `headers` and `html attributes` of your application.

Nuxt.js configures `vue-meta` with these options:
```js
{
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
}
```

### Default Meta Tags

Nuxt.js let you define all default meta for your application inside `nuxt.config.js`, use the same `head` property:

Example of a custom viewport with a custom Google font:
```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

To know the list of options you can give to `head`, take a look at [vue-meta documentation](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).

More information about the head method: [API Configuration head](/api/configuration-head)

### Custom Meta Tags for a Page

More information about the head method: [API Pages head](/api/pages-head)

<p class="Alert">To avoid any duplication when used in child component, please give a unique identifier with the `hid` key, please [read more about it](https://github.com/declandewet/vue-meta#lists-of-tags).</p>
