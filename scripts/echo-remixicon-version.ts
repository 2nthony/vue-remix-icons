// `version` used in sync-upstream.yml

import { REMIXICON_VERSION } from './utils'

echoRemixiconVersion()

async function echoRemixiconVersion() {
  console.log(`version=${REMIXICON_VERSION}`)
}
