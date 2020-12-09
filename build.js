const path = require('path')
const fs = require('fs-extra')
const { pascalCase, pascalCaseTransformMerge } = require('pascal-case')
const resolve = (...dir) => path.resolve(__dirname, ...dir)
const join = (...dir) => path.join(...dir)

const iconsPath = resolve('node_modules', 'remixicon', 'icons')

const allIconFilePaths = fs
  .readdirSync(iconsPath)
  .map((foldName) => join(iconsPath, foldName))
  .reduce((res, foldPath) => {
    const iconFileNames = fs.readdirSync(foldPath)
    iconFileNames.forEach((iconFileName) => {
      res.push(join(foldPath, iconFileName))
    })
    return res
  }, [])

const createVueTemplate = (icon) =>
  `
export default {
  render() {
    return ${icon.svg.replace(
      /<svg([^>]+)>/,
      `<svg class="remixicon ${icon.name}"$1>`,
    )}
  }
}
`.trim()

const icons = allIconFilePaths.map((iconFilePath) => {
  const name = 'ri-' + path.basename(iconFilePath).replace('.svg', '')
  return {
    name,
    componentName: pascalCase(name, { transform: pascalCaseTransformMerge }),
    svg: fs.readFileSync(iconFilePath, 'utf8'),
  }
})

Promise.all(
  icons.map((icon) => {
    const filePath = `./src/components/${icon.name}.js`
    const component = createVueTemplate(icon)
    return fs.outputFileSync(filePath, component, 'utf8')
  }),
).then(() => {
  const entryFile = icons
    .map((icon) => {
      return `export { default as ${icon.componentName} } from '../icons/${icon.name}.js'`
    })
    .join('\n\n')

  const typeFile = `
import type { DefineComponent } from 'vue'
type RemixIconComponent = DefineComponent<{}, {}, any>

${icons
  .map((icon) => {
    return `
const ${icon.componentName}: RemixIconComponent
export { ${icon.componentName} }
`.trim()
  })
  .join('\n\n')}
`.trim()

  fs.outputFileSync('./src/index.js', entryFile, 'utf8')
  fs.outputFileSync('./dist/types.d.ts', typeFile, 'utf8')
})
