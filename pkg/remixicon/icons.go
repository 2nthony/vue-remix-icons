package remixicon

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

type Icon struct {
	Name          string `json:"name"`
	ComponentName string `json:"componentName"`
	SVG           string `json:"svg"`
}

const BRAND_PREFIX = "ri-"

func toPascalCase(s string) string {
	parts := strings.Split(s, "-")
	for i := range parts {
		parts[i] = strings.Title(parts[i])
	}
	return strings.Join(parts, "")
}

func readSVGFile(filePath string) (string, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return "", err
	}
	return string(data), nil
}

func CollectIcons(basePath string) ([]Icon, error) {
	if _, err := os.Stat(basePath); os.IsNotExist(err) {
		fmt.Println("remixicon not installed")
		return nil, fmt.Errorf("remixicon not installed")
	}

	var icons []Icon

	entries, err := os.ReadDir(basePath)
	if err != nil {
		return nil, err
	}

	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}

		categoryPath := filepath.Join(basePath, entry.Name())

		err := filepath.WalkDir(categoryPath, func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				return err
			}

			if !d.IsDir() && strings.HasSuffix(strings.ToLower(path), ".svg") {
				svgData, err := readSVGFile(path)
				if err != nil {
					return nil
				}

				filename := filepath.Base(path)
				name := BRAND_PREFIX + strings.TrimSuffix(filename, filepath.Ext(filename))

				icon := Icon{
					Name:          name,
					ComponentName: toPascalCase(name),
					SVG:           svgData,
				}
				icons = append(icons, icon)
			}

			return nil
		})
		if err != nil {
			fmt.Println("error")
		}
	}

	return icons, nil
}

func BuildMainFileString(icons []Icon) (string, string) {
	mainFile := ``
	dtsFile := `import type { DefineComponent, SVGAttributes } from "vue";
type SVGComponent = DefineComponent<SVGAttributes, {}, any>;
declare module "vue-remix-icons/icons/*.vue" {
  const component: SVGComponent;
  export default component;
}
`

	for _, icon := range icons {
		mainFile += fmt.Sprintf("export { default as %s } from \"./icons/%s.vue\";\n", icon.ComponentName, icon.Name)
		dtsFile += fmt.Sprintf("export const %s: SVGComponent;\n", icon.ComponentName)
	}

	return mainFile, dtsFile
}
