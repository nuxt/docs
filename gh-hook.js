const micro = require('micro')
const crypto = require('crypto')
const os = require('os')
const git = require('simple-git')()
const uuid = require('uuid/v4')
const pify = require('pify')
const rimraf = pify(require('rimraf'))
let mergeDirs = require('merge-dirs')
const gitClone = pify(git.clone.bind(git))
const { resolve } = require('path')
const json = micro.json
const send = micro.send
// Fix merge-dirs default export
mergeDirs = mergeDirs.default ? mergeDirs.default : mergeDirs

// Refresh documentation files (pull from Github)
module.exports = async function ({ req, res }, getFiles) {
  const body = await json(req)
  console.log(body)
  // Only for production
  if (!process.env.GH_HOOK_SECRET || !req.headers['x-hub-signature']) {
    return send(res, 501)
  }
  // Check if X-Hub-Signature matches our secret
  let hmac = crypto.createHmac('sha1', process.env.GH_HOOK_SECRET)
  hmac.update(JSON.stringify(body))
  let signature = 'sha1=' + hmac.digest('hex')
  if (req.headers['x-hub-signature'] !== signature) {
    return send(res, 403)
  }
  // Accept only push hook events
  if (req.headers['x-github-event'] === 'ping') {
    return send(res, 200, 'OK')
  }
  // Only push event authorized
  if (req.headers['x-github-event'] !== 'push') {
    return send(res, 501)
  }
  const clonePath = resolve(os.tmpdir(), uuid())
  await gitClone('https://github.com/nuxt/docs.git', clonePath)
  console.log('clonePath', clonePath)
  mergeDirs(clonePath, resolve(__dirname), 'overwrite')
  await getFiles()
  await rimraf(clonePath)
  send(res, 200, 'OK')
}
