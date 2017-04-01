const micro = require('micro')
const crypto = require('crypto')
const os = require('os')
const uuid = require('uuid/v4')
const pify = require('pify')
const rimraf = pify(require('rimraf'))
const download = require('download')
const { resolve } = require('path')
const json = micro.json
const send = micro.send

// Refresh documentation files (pull from GitHub)
module.exports = async function ({ req, res }, getFiles) {
  const body = await json(req)
  // Only for production
  if (!process.env.GH_HOOK_SECRET || !req.headers['x-hub-signature']) {
    return send(res, 501)
  }
  console.log('Received GitHub Hook', req.headers['x-github-delivery'])
  // Check if X-Hub-Signature matches our secret
  let hmac = crypto.createHmac('sha1', process.env.GH_HOOK_SECRET)
  hmac.update(JSON.stringify(body))
  let signature = 'sha1=' + hmac.digest('hex')
  if (req.headers['x-hub-signature'] !== signature) {
    return send(res, 403, 'Bad signature')
  }
  // Accept only push hook events
  if (req.headers['x-github-event'] === 'ping') {
    return send(res, 200, 'OK')
  }
  // Only push event authorized
  if (req.headers['x-github-event'] !== 'push') {
    return send(res, 501, 'Not push event')
  }
  let clonePath = resolve(os.tmpdir(), uuid())
  console.log('Download repository...')
  await download('https://github.com/nuxt/docs/archive/master.zip', clonePath, { extract: true })
  clonePath = resolve(clonePath, 'docs-master')
  await getFiles(clonePath)
  console.log('Docs file updated!')
  await rimraf(clonePath)
  send(res, 200, 'OK')
}
