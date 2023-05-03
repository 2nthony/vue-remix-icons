import path from 'node:path'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { pascalCase, pascalCaseTransformMerge } from 'pascal-case'

const PREFIX = 'ri-'

interface Icon {
  name: string
  svg: string
  componentName: string
}

const resolveRoot = (...dir: string[]) => path.resolve(__dirname, '..', ...dir)

function resolveRemixiconDir(...dir: string[]) {
  return path.resolve(__dirname, '..', 'node_modules', 'remixicon', 'icons', ...dir)
}

function resolveVueString(icon: Icon) {
  return `<template>
  ${icon.svg.replace(/<svg([^>]+)>/, `<svg class="remixicon ${icon.name}"$1>`)}
</template>
`.trim()
}

gen()

async function gen() {
  const icons = await collectAllIconMetas()
  const { mainFile, dtsFile } = await collectFileString(icons)

  // ensure path: `/icons`
  await mkdir(resolveRoot('icons'), { recursive: true })

  await genIcons(icons)
  await writeFile(resolveRoot('index.js'), mainFile, 'utf8')
  await writeFile(resolveRoot('index.d.ts'), dtsFile, 'utf8')
}

async function collectAllIconMetas(): Promise<Icon[]> {
  const res: Icon[] = []
  const categoryDirs = await readdir(resolveRemixiconDir())

  for (let i = 0; i < categoryDirs.length; i++) {
    const categoryDir = categoryDirs[i]
    const iconDirs = await readdir(resolveRemixiconDir(categoryDir))

    for (let j = 0; j < iconDirs.length; j++) {
      const iconName = iconDirs[j]
      const name = PREFIX + path.basename(iconName).replace('.svg', '')
      const componentName = pascalCase(name, {
        transform: pascalCaseTransformMerge,
      })
      const svg = await readFile(
        resolveRemixiconDir(categoryDir, iconName),
        'utf8',
      )

      res.push({
        name,
        componentName,
        svg,
      })
    }
  }

  return res
}

async function genIcons(icons: Icon[]) {
  loopIcons(icons, async (icon) => {
    await writeFile(
      resolveRoot('icons', `${icon.name}.vue`),
      resolveVueString(icon),
      'utf8',
    )
  })
}

async function collectFileString(icons: Icon[]) {
  let mainFile = ''
  let dtsFile = `import type { DefineComponent, SVGAttributes } from "vue";
type SVGComponent = DefineComponent<SVGAttributes, {}, any>;
declare module "vue-remix-icons/icons/*.vue" {
  const component: SVGComponent;
  export default component;
}
`

  loopIcons(icons, (icon) => {
    mainFile += `export { default as ${icon.componentName} } from "./icons/${icon.name}.vue";\n`
    dtsFile += `export const ${icon.componentName}: SVGComponent;\n`
  })

  return {
    mainFile,
    dtsFile,
  }
}

function loopIcons(icons: Icon[], fn: (icon: Icon) => any | Promise<any>) {
  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i]
    fn(icon)
  }
}
