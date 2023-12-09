// flag
// flag=1 means need to update, flag=0 means no need to update
// also used in sync-upstream.yml

import latestVersion from 'latest-version'
import pkg from '../package.json'

const remixiconVersion = pkg.devDependencies.remixicon.slice(1)

checkUpstreamVersion()

async function checkUpstreamVersion() {
  const latestRemixiconVersion = await latestVersion('remixicon')
  if (remixiconVersion !== latestRemixiconVersion) {
    console.log('flag=1')
    return
  }

  console.log('flag=0')
}
