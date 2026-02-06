package npm

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
)

type RegistryResponse struct {
	DistTags map[string]string         `json:"dist-tags"`
	Versions map[string]map[string]any `json:"versions"`
}

func FetchNpmPackageJson(pkgName string) (map[string]any, error) {
	// Implementation here
	escapedName := url.PathEscape(pkgName)
	registryURL := fmt.Sprintf("https://registry.npmjs.org/%s", escapedName)

	resp, err := http.Get(registryURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var reg RegistryResponse
	if err := json.Unmarshal(body, &reg); err != nil {
		return nil, err
	}

	latest, ok := reg.DistTags["latest"]
	if !ok {
		return nil, fmt.Errorf("no latest version found")
	}

	pkgJSON, ok := reg.Versions[latest]
	if !ok {
		return nil, fmt.Errorf("package.json for version %s not found", latest)
	}

	return pkgJSON, nil
}

func FetchNpmPackageJsonLatestVersion(pkgName string) (string, error) {
	data, err := FetchNpmPackageJson(pkgName)
	if err != nil {
		return "", err
	}

	return data["version"].(string), nil
}
