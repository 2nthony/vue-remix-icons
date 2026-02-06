package remixicon

import (
	"encoding/json"
	"os"
)

var pkgJson struct {
	DevDependencies struct {
		Remixicon string `json:"remixicon"`
	} `json:"devDependencies"`
}

func GetVersion() string {
	pkg, _ := os.ReadFile("package.json")
	json.Unmarshal(pkg, &pkgJson)

	return pkgJson.DevDependencies.Remixicon[1:]
}
