# vue-remix-icons (Vue 3 only)

> Vue port Remix Icon
> Remix Icon is a set of open source neutral style system symbols elaborately crafted for designers and developers.

Please consider starring the project to show your ❤️ and support.

[![NPM version](https://badgen.net/npm/v/vue-remix-icons?icon=npm)](https://npmjs.com/package/vue-remix-icons)
[![NPM download](https://badgen.net/npm/dm/vue-remix-icons?icon=npm)](https://npmjs.com/package/vue-remix-icons)
[![License](https://badgen.net/npm/license/vue-remix-icons)](./LICENSE)

## Install

```console
yarn add vue-remix-icons
```

## Usage

```js
import { RiHomeLine, RiAirplayFill } from 'vue-remix-icons'
```

See all icons here: http://remixicon.com/

Note that the usage is changed from `<i class="ri-home-line"></i>` to import `RiHomeLine` .

## Tips

### Smart(faster) way to use

Create a component name `RemixIcon`:

```vue
<template>
  <component
    v-if="icon"
    :is="
      require(`vue-remix-icons/icons/ri-${icon}-${fill ? 'fill' : 'line'}.js`)
        .default
    "
  />
</template>

<script>
export default {
  props: {
    icon: String,
    fill: Boolean,
  },
}
</script>
```

Then in other vue file:

```vue
<template>
  <RemixIcon icon="home" />
  <RemixIcon icon="home-2" fill />
</template>
```

## Tree-Shaking

Webpack + minified supported.

## Credits

- [remixicon](https://github.com/Remix-Design/remixicon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**vue-remix-icons** © [evillt](https://github.com/evillt), Released under the [Apache 2.0](./LICENSE) License.

Authored and maintained by **EVILLT** with help from contributors ([list](https://github.com/evillt/vue-remix-icons/contributors)).

> [evila.me](https://evila.me) · GitHub [@evillt](https://github.com/evillt) · Twitter [@evillt](https://twitter.com/evillt)
