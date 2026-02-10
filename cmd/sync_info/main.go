package main

import (
	"fmt"

	"vue-remix-icons/pkg/npm"
	"vue-remix-icons/pkg/remixicon"
)

func main() {
	localVersion := remixicon.GetVersion()
	upstreamVersion, err := npm.FetchNpmPackageJsonLatestVersion("remixicon")
	if err != nil {
		panic(err)
	}

	result := "version=%s,bump=%d\n"

	if localVersion != upstreamVersion {
		result = fmt.Sprintf(result, upstreamVersion, 1)
	} else {
		result = fmt.Sprintf(result, localVersion, 0)
	}

	fmt.Println(result)
}
