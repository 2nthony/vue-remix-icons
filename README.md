# vue-remix-icons

[![version](https://img.shields.io/npm/v/vue-remix-icons?label=&color=29BC9B)](https://npm.im/vue-remix-icons)
[![downloads](https://img.shields.io/npm/dm/vue-remix-icons?label=&color=29BC9B)](https://npm.im/vue-remix-icons)

Remix Icon is a set of open source neutral style system symbols elaborately crafted for designers and developers.


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

## Details

```html
<RiHomeLine />
```

Will render as:

```html
<svg class="remixicon ri-home-line">...</svg>
```

## Credits

- [remixicon](https://github.com/Remix-Design/remixicon)

## Sponsors

[![sponsors](https://cdn.jsdelivr.net/gh/2nthony/sponsors-image/sponsors.svg)](https://github.com/sponsors/2nthony)

## License

Apache-2.0 &copy; [2nthony](https://github.com/sponsors/2nthony)
