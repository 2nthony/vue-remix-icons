// bump
// bump=1 means need to update, bump=0 means no need to update
// also used in sync-upstream.yml

import latestVersion from 'latest-version'
import { REMIXICON_VERSION } from './utils'

echoRemixiconBump()

async function echoRemixiconBump() {
  const latestRemixiconVersion = await latestVersion('remixicon')

  if (REMIXICON_VERSION !== latestRemixiconVersion) {
    console.log('bump=1')
    return
  }

  console.log('bump=0')
}
