const fs = require('fs')
const micro = require('micro')
const pify = require('pify')
const glob = pify(require('glob'))
const marked = require('marked')
const highlightjs = require('highlight.js')
const fm = require('front-matter')
const { resolve } = require('path')
const githubHook = require('./gh-hook')
const readFile = pify(fs.readFile)
const send = micro.send

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

// Server handle request method
const server = micro(async function (req, res) {
  // If github hook
  if (req.method === 'POST' && req.url === '/hook') {
    return await githubHook({ req, res }, getFiles)
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
