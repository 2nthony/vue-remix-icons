# Attention

remixicon now support Vue 3 officially, this package will continue sync upstream for Vue 2 users, but if you use Vue 3, better use official package!

---

# vue-remix-icons

[![version](https://img.shields.io/npm/v/vue-remix-icons?label=&color=29BC9B)](https://npm.im/vue-remix-icons)
[![downloads](https://img.shields.io/npm/dm/vue-remix-icons?label=&color=29BC9B)](https://npm.im/vue-remix-icons)

Remix Icon is a set of open source neutral style system symbols elaborately crafted for designers and developers.

**Notics**: this package will auto release a new feature version when then upstream package([remixicon](https://github.com/Remix-Design/remixicon)) released, if you facing any issues, please open an issue to let me know.

## Features

- [x] Types ready
- [x] Support Vue 2 and Vue 3
- [x] Tree-Shaking

## Install

```bash
npm i vue-remix-icons
```

## Usage

Notice: for support Vue 2 & Vue 3 projects, the all imported icons is a Vue file, so you need to use this lib under the JS bundler like vite, webpack or other Vue framework.

```html
<template>
  <RiHomeLine />
</tempalte>

<script>
// tree-shaking
import { RiHomeLine } from "vue-remix-icons";
// if not, import the one you needed
import RiHomeLine from "vue-remix-icons/icons/ri-home-line.vue"

export default {
  components: {
    RiHomeLine,
  },
}
</script>
```

See all icons here: http://remixicon.com/

Note that just change the usage from `<i class="ri-home-line"></i>` to import `RiHomeLine` .

### Nuxt 3

Transpile vue-remix-icons, see [#13](https://github.com/2nthony/vue-remix-icons/issues/13).

```ts
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ['vue-remix-icons'],
  },
})
```

## Details

```html
<RiHomeLine />
```

Will render as:

```html
<svg class="remixicon ri-home-line">...</svg>
```

## Breaking Changes

### `v3.0.0`

Generated file now kebab-case, reason see [#10](https://github.com/2nthony/vue-remix-icons/issues/10).

```diff
- import RiHomeLine from "vue-remix-icons/icons/RiHomeLine.vue"
+ import RiHomeLine from "vue-remix-icons/icons/ri-home-line.vue"
```

## Credits

- [remixicon](https://github.com/Remix-Design/remixicon)

## Sponsors

[![sponsors](https://cdn.jsdelivr.net/gh/2nthony/sponsors-image/sponsors.svg)](https://github.com/sponsors/2nthony)

## License

Apache-2.0 &copy; [2nthony](https://github.com/sponsors/2nthony)
