import path from 'node:path'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { pascalCase, pascalCaseTransformMerge } from 'pascal-case'

const PREFIX = 'ri-'

interface Icon {
  name: string
  svg: string
  componentName: string
}

function resolveRoot(...dir: string[]) {
  return path.resolve(__dirname, '..', ...dir)
}

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

  await loop(categoryDirs, async (categoryDir) => {
    const iconsDirs = await readdir(resolveRemixiconDir(categoryDir))

    await loop(iconsDirs, async (iconName) => {
      const name = PREFIX + path.basename(iconName).replace('.svg', '')
      const componentName = pascalCase(name, {
        transform: pascalCaseTransformMerge,
      })
      const svg = await readFile(resolveRemixiconDir(categoryDir, iconName), 'utf8')

      res.push({
        name,
        componentName,
        svg,
      })
    })
  })

  return res
}

async function genIcons(icons: Icon[]) {
  await loop(icons, async (icon) => {
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

  await loop(icons, (icon) => {
    mainFile += `export { default as ${icon.componentName} } from "./icons/${icon.name}.vue";\n`
    dtsFile += `export const ${icon.componentName}: SVGComponent;\n`
  })

  return {
    mainFile,
    dtsFile,
  }
}

async function loop<T>(data: T[], cb: (value: T) => void | Promise<void>) {
  for (let i = 0; i < data.length; i++) {
    const el = data[i]
    await cb(el)
  }
}
