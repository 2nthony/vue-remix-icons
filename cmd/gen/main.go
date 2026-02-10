package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"

	"vue-remix-icons/pkg/remixicon"
)

const (
	REMIXICON_PATH = "node_modules/remixicon/icons"
	OUTPUT_DIR     = "icons"
)

func main() {
	icons, err := remixicon.CollectIcons(REMIXICON_PATH)
	if err != nil {
		fmt.Println(err)
		return
	}

	// create `icons` folder, ignore error if it already exists
	mkdir(OUTPUT_DIR)

	mainFile, dtsFile := remixicon.BuildMainFileString(icons)

	writeFile("index.js", []byte(mainFile))
	writeFile("index.d.ts", []byte(dtsFile))

	if err := writeIcons(icons); err != nil {
		fmt.Println(err)
		return
	}
}

func writeIcons(icons []remixicon.Icon) error {
	for _, icon := range icons {
		vueTemplate := buildVueTemplate(icon)
		if err := writeFile(fmt.Sprintf("%s/%s.vue", OUTPUT_DIR, icon.Name), []byte(vueTemplate)); err != nil {
			return err
		}
	}
	return nil
}

func buildVueTemplate(icon remixicon.Icon) string {
	re := regexp.MustCompile(`<svg([^>]+)>`)
	modified := re.ReplaceAllString(icon.SVG, fmt.Sprintf(`<svg class="remixicon %s"$1>`, icon.Name))

	return fmt.Sprintf(
		`<template>
	%s
</template>`,
		strings.TrimSpace(modified),
	)
}

func mkdir(name string) error {
	return os.Mkdir(name, 0o755)
}

func writeFile(name string, data []byte) error {
	return os.WriteFile(name, data, 0o644)
}
