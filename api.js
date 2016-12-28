const fs = require('fs')
const micro = require('micro')
const pify = require('pify')
const glob = pify(require('glob'))
const chokidar = require('chokidar')
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
let _DOC_FILES_ = {}
async function getFiles (cwd) {
  console.log('Building files...')
  cwd = cwd || process.cwd()
  let docPaths = await glob('*/**/*.md', {
    cwd: cwd,
    ignore: 'node_modules/**/*',
    nodir: true
  })
  let promises = []
  let tmpDocFiles = {}
  docPaths.forEach((path) => {
    let promise = getDocFile(path, cwd)
    promise.then((file) => {
      tmpDocFiles[path] = file
    })
    promises.push(promise)
  })
  await Promise.all(promises)
  _DOC_FILES_ = tmpDocFiles
  // Construct the doc menu
  await getMenu(cwd)
  // Construct the lang object
  await getLanguages(cwd)
}

// Get doc file and sent back it's attributes and html body
async function getDocFile (path, cwd) {
  cwd = cwd || process.cwd()
  let file = await readFile(resolve(cwd, path), 'utf-8')
  // transform markdown to html
  file = fm(file)
  _DOC_FILES_[path] = {
    attrs: file.attributes,
    body: marked(file.body)
  }
  return _DOC_FILES_[path]
}

// Get menu files and create the doc menu
let _MENU_ = {}
async function getMenu (cwd) {
  console.log('Building menu...')
  cwd = cwd || process.cwd()
  let menuPaths = await glob('*/**/menu.json', {
    cwd: cwd,
    ignore: 'node_modules/**/*',
    nodir: true
  })
  let tmpMenu = {}
  let promises = []
  menuPaths.forEach((path) => {
    let menu = tmpMenu
    let keys = path.split('/').slice(0, -1)
    keys.forEach((key, i) => {
      if ((i + 1) === keys.length) {
        let promise = readFile(resolve(cwd, path), 'utf-8')
        promise.then((fileContent) => {
          menu[key] = JSON.parse(fileContent)
        })
        promises.push(promise)
        return
      }
      menu[key] = menu[key] || {}
      menu = menu[key]
    })
  })
  await Promise.all(promises)
  _MENU_ = tmpMenu
}

// Get lang files and create the lang object
let _LANG_ = {}
async function getLanguages (cwd) {
  console.log('Building languages...')
  cwd = cwd || process.cwd()
  let langPaths = await glob('*/lang.json', {
    cwd: cwd,
    ignore: 'node_modules/**/*',
    nodir: true
  })
  let tmpLang = {}
  let promises = []
  langPaths.forEach((path) => {
    let lang = path.split('/')[0]
    let promise = readFile(resolve(cwd, path), 'utf-8')
    promise.then((fileContent) => {
      tmpLang[lang] = JSON.parse(fileContent)
    })
    promises.push(promise)
  })
  await Promise.all(promises)
  _LANG_ = tmpLang
}

// watch file changes
function watchFiles () {
  console.log('Watch files changes...')
  const options = {
    ignoreInitial: true,
    ignored: 'node_modules/**/*'
  }
  // Doc Pages
  chokidar.watch('*/**/*.md', options)
  .on('add', (path) => getDocFile(path))
  .on('change', (path) => getDocFile(path))
  .on('unlink', (path) => delete _DOC_FILES_[path])
  // Menu
  chokidar.watch('*/**/menu.json', options)
  .on('add', () => getMenu())
  .on('change', () => getMenu())
  .on('unlink', () => getMenu())
  // Lang
  chokidar.watch('*/lang.json', options)
  .on('add', () => getLanguages())
  .on('change', () => getLanguages())
  .on('unlink', () => getLanguages())
}

// Server handle request method
const server = micro(async function (req, res) {
  // If github hook
  if (req.method === 'POST' && req.url === '/hook') {
    try {
      return await githubHook({ req, res }, getFiles)
    } catch (e) {
      console.error('Error!')
      console.error(e)
    }
  }
  if (req.url.indexOf('/menu') === 0) {
    let lang = req.url.split('/')[2]
    if (lang && _MENU_[lang]) return send(res, 200, _MENU_[lang])
    else if (lang) return send(res, 404, 'Language not found')
    return send(res, 200, _MENU_)
  }
  if (req.url.indexOf('/lang') === 0) {
    let lang = req.url.split('/')[2]
    if (lang && _LANG_[lang]) return send(res, 200, _LANG_[lang])
    else if (lang) return send(res, 404, 'Language not found')
    return send(res, 200, _LANG_)
  }
  // remove first /
  let path = req.url.slice(1) + '.md'
  // Check if path exists
  if (!_DOC_FILES_[path]) {
    return send(res, 404, 'File not found')
  }
  // Send back doc content
  send(res, 200, _DOC_FILES_[path])
})

getFiles()
.then(() => {
  if (process.env.NODE_ENV !== 'production') {
    watchFiles()
  }
  const port = process.env.PORT || 4000
  server.listen(port)
  console.log(`Server listening on localhost:${port}`)
})
