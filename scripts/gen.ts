import path from "path";
import fs from "fs-extra";
import { pascalCase, pascalCaseTransformMerge } from "pascal-case";

type Icon = {
  name: string;
  svg: string;
  componentName: string;
};

const resolveDist = (...dir: string[]) =>
  path.resolve(__dirname, "..", "dist", ...dir);

const remixiconsDir = path.resolve(
  __dirname,
  "..",
  "node_modules",
  "remixicon",
  "icons",
);

const allIconFilePaths = fs
  .readdirSync(remixiconsDir)
  .map((foldName) => path.join(remixiconsDir, foldName))
  .reduce<string[]>((res, foldPath) => {
    const iconFileNames = fs.readdirSync(foldPath);
    iconFileNames.forEach((iconFileName) => {
      res.push(path.join(foldPath, iconFileName));
    });
    return res;
  }, []);

const resolveVueString = (icon: Icon) =>
  `<template>
  ${icon.svg.replace(/<svg([^>]+)>/, `<svg class="remixicon ${icon.name}"$1>`)}
</template>
`.trim();

const icons = allIconFilePaths.map<Icon>((iconFilePath) => {
  const name = "ri-" + path.basename(iconFilePath).replace(".svg", "");
  return {
    name,
    componentName: pascalCase(name, { transform: pascalCaseTransformMerge }),
    svg: fs.readFileSync(iconFilePath, "utf8"),
  };
});

Promise.all(
  icons.map((icon) =>
    fs.outputFileSync(
      resolveDist("icons", `${icon.name}.vue`),
      resolveVueString(icon),
      "utf8",
    ),
  ),
).then(() => {
  let mainFile = "";
  let dtsFile = `import { Component } from "vue";
declare module "vue-remix-icons/**.vue" {
  export default Component;
}
`;

  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i];

    mainFile += `export { default as ${icon.componentName} } from "./icons/${icon.name}.vue";\n`;
    dtsFile += `export const ${icon.componentName}: Component;\n`;
  }

  fs.outputFileSync(resolveDist("index.js"), mainFile, "utf8");
  fs.outputFileSync(resolveDist("index.d.ts"), dtsFile, "utf8");
});
