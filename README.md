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

In this case, all icons will be included in the bundle.

Create a component name `RemixIcon`:

```vue
<template>
  <component
    v-if="icon"
    :is="component"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RiIconName, RiIconStyle } from 'vue-remix-icons'

export default defineComponent({
  props: {
    icon: {
      type: String as PropType<RiIconName>,
      required: true,
    },
    style: {
      type: String as PropType<RiIconStyle>,
      default: '',
    },
  },
  computed: {
    component: function () {
      return require(`vue-remix-icons/icons/ri-${this.$props.icon}${this.$props.style}.js`).default
    },
  },
})
</script>
```

Then in other vue file:

```vue
<template>
  <RemixIcon icon="home" style="line" />
  <RemixIcon icon="home-2" style="fill" />
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
