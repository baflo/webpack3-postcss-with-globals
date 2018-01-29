# Webpack3 PostCSS modules with global CSS

Goal of this demo project is to show how `css-loader` can be used to build local CSS modules on the one hand, and import global CSS on the other hand.

## Used packages

`style-loader`

Packs the CSS into a JavaScript bundle that, once loaded, injects the CSS as a `<style>` tag.

`css-loader`

Interprets `url()` and will load it. Also, it allows for local CSS by applying CSS modules.

`postcss-loader` and `postcss-import`

Allows for importing CSS libraries like Bootstrap or PureCSS.

## Specific implementation

Everying that's in `styles/__global.css` will be global, while everything else in `styles` are modules. I.e. using `.bad-text` from `styles/index.css` directly in `index.html` won't work: It will get another, hased value by `css-loader`.

## Other things

There are improvements.

### Isomorphic

Use https://github.com/kriasoft/isomorphic-style-loader instead of `style-loader` as well as https://github.com/TobiasWalle/isomorphic-style-loader-utils to prevent [FOUC](https://de.wikipedia.org/wiki/Flash_of_Unstyled_Content).

### TypeScript

Use https://github.com/Jimdo/typings-for-css-modules-loader instead of `css-loader` (it's an one-to-one replacement that require css-loader as peer dependency) to build type declarations on the fly.

