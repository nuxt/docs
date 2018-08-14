---
title: "API: The loading indicator Property"
description: Show fancy loading indicator while SPA page is loading!
---

# The loadingIndicator Property

> Show fancy loading indicator while SPA page is loading!

When running nuxt.js in SPA mode, there is no content from the server side on the first page load,
So instead of showing a blank page while the page loads, we may show a spinner.

This property can have 3 different types: `string` or `false` or `object`.
If a string value is provided it is converted to object style.

Default value is: 
```js
{
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## Built-in Indicators

This indicators are ported from awesome [Spinkit](http://tobiasahlin.com/spinkit) project.
You can use it's demo page to preview spinners.

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

Built-in indicators support `color` and `background` options.

## Custom indicators

If you need your own special indicator, a String value or Name key can also be a path to an html template of indicator source code!
All of the options are passed to the template too.

Nuxt Built-ins [source code](https://github.com/nuxt/nuxt.js/tree/dev/lib/app/views/loading) is also available if you need a base!
