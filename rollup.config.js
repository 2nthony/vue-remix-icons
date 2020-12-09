const fast = (format, ext) => ({
  input: 'src/index.js',
  output: {
    format,
    name: 'vueRemixIcons',
    file: `dist/vue-remix-icons.${ext || format}.js`,
    globals: {
      vue: 'Vue',
    },
  },
})

export default [fast('es'), fast('cjs'), fast('umd'), fast('umd', 'min')]
