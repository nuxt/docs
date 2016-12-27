const fs = require('fs')
const crypto = require('crypto')
const os = require('os')
const git = require('simple-git')()
const uuid = require('uuid/v4')
const micro = require('micro')
const pify = require('pify')
const rimraf = pify(require('rimraf'))
const glob = pify(require('glob'))
const marked = require('marked')
const highlightjs = require('highlight.js')
const fm = require('front-matter')
const { resolve } = require('path')
const readFile = pify(fs.readFile)
const gitClone = pify(git.clone.bind(git))
const send = micro.send
const json = micro.json

// Use highlight.js for code blocks
const renderer = new marked.Renderer()
renderer.code = (code, language) => {
  const validLang = !!(language && highlightjs.getLanguage(language))
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
}
marked.setOptions({ renderer })

// Fetch doc and menu files
let docFiles = []
let _CACHE_DOC_FILES_ = {}
let _CACHE_MENU_ = {}
async function getFiles () {
  _CACHE_DOC_FILES_ = {}
  docFiles = await glob('*/**/*.md', {
    ignore: 'node_modules/**/*',
    nodir: true
  })
  _CACHE_MENU_ = {}
  let filePaths = await glob('*/**/menu.json', {
    ignore: 'node_modules/**/*',
    nodir: true
  })
  filePaths.forEach((path) => {
    let cache = _CACHE_MENU_
    let keys = path.split('/').slice(0, -1)
    keys.forEach((key, i) => {
      if ((i + 1) === keys.length) {
        cache[key] = require(resolve(__dirname, path))
        return
      }
      cache[key] = cache[key] || {}
      cache = cache[key]
    })
  })
}
// Get doc file and sent back it's attributes and html body
async function getDocFile (path) {
  path = resolve(__dirname, path)
  if (process.env.NODE_ENV !== 'production' && _CACHE_DOC_FILES_[path]) {
    return _CACHE_DOC_FILES_[path]
  }
  let file = await readFile(path, 'utf-8')
  // transform markdown to html
  file = fm(file)
  _CACHE_DOC_FILES_[path] = {
    attrs: file.attributes,
    body: marked(file.body)
  }
  return _CACHE_DOC_FILES_[path]
}

// Refresh documentation files (pull from Github)
async function pullDocFiles ({ req, res }) {
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
  console.log('Cloned', clonePath)
  await getFiles()
  await rimraf(clonePath)
  send(res, 200, 'OK')
}

// Server handle request method
const server = micro(async function (req, res) {
  // If github hook
  if (req.method === 'POST' && req.url === '/hook') {
    return await pullDocFiles({ req, res })
  }
  if (req.url === '/menu') {
    return send(res, 200, _CACHE_MENU_)
  }
  // remove first /
  let path = req.url.slice(1)
  // Check if path exists
  const docFile = docFiles.find((f) => f === path)
  if (!docFile) {
    return send(res, 404, 'File not found')
  }
  // Send back doc content
  send(res, 200, await getDocFile(path))
})

getFiles()
.then(() => {
  const port = process.env.PORT || 4000
  server.listen(port)
  console.log(`Server listening on localhost:${port}`)
})
