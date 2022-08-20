import path from "path";
import { pascalCase, pascalCaseTransformMerge } from "pascal-case";
import { mkdir, readdir, readFile, writeFile } from "fs/promises";

type Icon = {
  name: string;
  svg: string;
  componentName: string;
};

const resolveRoot = (...dir: string[]) => path.resolve(__dirname, "..", ...dir);

const resolveRemixiconDir = (...dir: string[]) =>
  path.resolve(__dirname, "..", "node_modules", "remixicon", "icons", ...dir);

const resolveVueString = (icon: Icon) =>
  `<template>
  ${icon.svg.replace(/<svg([^>]+)>/, `<svg class="remixicon ${icon.name}"$1>`)}
</template>
`.trim();

gen();

async function gen() {
  const icons = await collectAllIconMetas();
  const { mainFile, dtsFile } = await collectFileString(icons);

  // ensure path: `/icons`
  await mkdir(resolveRoot("icons"), { recursive: true });

  await genIcons(icons);
  await writeFile(resolveRoot("index.js"), mainFile, "utf8");
  await writeFile(resolveRoot("index.d.ts"), dtsFile, "utf8");
}

async function collectAllIconMetas(): Promise<Icon[]> {
  const res: Icon[] = [];
  const categoryDirs = await readdir(resolveRemixiconDir());

  for (let i = 0; i < categoryDirs.length; i++) {
    const categoryDir = categoryDirs[i];
    const iconDirs = await readdir(resolveRemixiconDir(categoryDir));

    for (let j = 0; j < iconDirs.length; j++) {
      const iconName = iconDirs[j];
      const name = path.basename(iconName).replace(".svg", "");
      const componentName = pascalCase(name, {
        transform: pascalCaseTransformMerge,
      });
      const svg = await readFile(
        resolveRemixiconDir(categoryDir, iconName),
        "utf8",
      );

      res.push({
        name,
        componentName,
        svg,
      });
    }
  }

  return res;
}

async function genIcons(icons: Icon[]) {
  loopIcons(icons, async (icon) => {
    await writeFile(
      resolveRoot("icons", `${icon.componentName}.vue`),
      resolveVueString(icon),
      "utf8",
    );
  });
}

async function collectFileString(icons: Icon[]) {
  let mainFile = "";
  let dtsFile = `import { Component } from "vue";
declare module "vue-remix-icons/icons/*.vue" {
  export default Component;
}
`;

  loopIcons(icons, (icon) => {
    mainFile += `export { default as ${icon.componentName} } from "./icons/${icon.componentName}.vue";\n`;
    dtsFile += `export const ${icon.componentName}: Component;\n`;
  });

  return {
    mainFile,
    dtsFile,
  };
}

function loopIcons(icons: Icon[], fn: (icon: Icon) => any | Promise<any>) {
  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i];
    fn(icon);
  }
}
