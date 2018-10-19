const { promisify } = require('util')
const { resolve } = require('path')
const fs = require('fs')

const micro = require('micro')
const axios = require('axios')
const marked = require('marked')
const highlightjs = require('highlight.js')
const fm = require('front-matter')
const consola = require('consola')

const glob = promisify(require('glob'))
const readFile = promisify(fs.readFile)

const githubHook = require('./gh-hook')

const send = micro.send

// Use highlight.js for code blocks
const renderer = new marked.Renderer()
renderer.code = (code, language) => {
  const validLang = !!(language && highlightjs.getLanguage(language))
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
}
renderer.heading = (text, level) => {
  const patt = /\s?{([^}]+)}$/
  let link = patt.exec(text)

  if (link && link.length && link[1]) {
    text = text.replace(patt, '')
    link = link[1]
  } else {
    link = text.toLowerCase().replace(/[^\wА-яіІїЇєЄ\u4e00-\u9eff一-龠ぁ-ゔァ-ヴー々〆〤\u3130-\u318F\uAC00-\uD7AF]+/gi, '-')
  }
  return '<h' + level + ' id="' + link + '">' + text + '</h' + level + '>'
}
marked.setOptions({ renderer })

// Fetch releases
let RELEASES = []

const getReleases = async () => {
  consola.info('Fetching releases...')
  const options = { url: 'https://api.github.com/repos/nuxt/nuxt.js/releases' }
  if (process.env.GITHUB_TOKEN) {
    options.headers = { 'Authorization': `token ${process.env.GITHUB_TOKEN}` }
  }
  try {
    const res = await axios(options)
    RELEASES = res.data.filter(r => !r.draft).map((release) => {
      return {
        name: release.name,
        date: release.published_at,
        body: marked(release.body)
      }
    })
  } catch (e) {
    consola.error('Could not fetch nuxt.js release notes.')
  }
  const getMajorVersion = r => r.name && Number(r.name.substring(1, 2))
  RELEASES.sort((a, b) => {
    const aMajorVersion = getMajorVersion(a)
    const bMajorVersion = getMajorVersion(b)
    if (aMajorVersion !== bMajorVersion) {
      return bMajorVersion - aMajorVersion
    }
    return new Date(b.date) - new Date(a.date)
  })
  // Refresh every 15 minutes
  setTimeout(getReleases, 15 * 60 * 1000)
}

// Fetch doc and menu files
let _DOC_FILES_ = {}

async function getFiles(cwd) {
  consola.info('Building files...')
  cwd = cwd || process.cwd()
  const docPaths = await glob('*/**/*.md', {
    cwd: cwd,
    ignore: 'node_modules/**/*',
    nodir: true
  })

  const promises = []
  const tmpDocFiles = {}
  docPaths.forEach((path) => {
    const promise = getDocFile(path, cwd)
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
async function getDocFile(path, cwd) {
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

async function getMenu(cwd) {
  consola.info('Building menu...')
  cwd = cwd || process.cwd()
  const menuPaths = await glob('*/**/menu.json', {
    cwd: cwd,
    ignore: 'node_modules/**/*',
    nodir: true
  })
  const tmpMenu = {}
  const promises = []
  menuPaths.forEach((path) => {
    let menu = tmpMenu
    const keys = path.split('/').slice(0, -1)
    keys.forEach((key, i) => {
      if ((i + 1) === keys.length) {
        const promise = readFile(resolve(cwd, path), 'utf-8')
        promise.then((fileContent) => {
          menu[key] = JSON.parse(fileContent)
        }).catch((e) => { consola.error(e, path) })
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

async function getLanguages(cwd) {
  consola.info('Building languages...')
  cwd = cwd || process.cwd()
  const langPaths = await glob('*/lang.json', {
    cwd: cwd,
    ignore: 'node_modules/**/*',
    nodir: true
  })
  const tmpLang = {}
  const promises = []
  langPaths.forEach((path) => {
    const lang = path.split('/')[0]
    const promise = readFile(resolve(cwd, path), 'utf-8')
    promise.then((fileContent) => {
      tmpLang[lang] = JSON.parse(fileContent)
    })
    promises.push(promise)
  })
  await Promise.all(promises)
  _LANG_ = tmpLang
}

// watch file changes
function watchFiles() {
  consola.info('Watch files changes...')
  const options = {
    ignoreInitial: true,
    ignored: 'node_modules/**/*'
  }
  const chokidar = require('chokidar')
  // Doc Pages
  chokidar.watch('*/**/*.md', options)
    .on('add', path => getDocFile(path))
    .on('change', path => getDocFile(path))
    .on('unlink', path => delete _DOC_FILES_[path])
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
      consola.error('Error!')
      consola.error(e)
    }
  }
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  // Releases
  if (req.url === '/releases') {
    return send(res, 200, RELEASES)
  }
  // Menu
  if (req.url.indexOf('/menu') === 0) {
    const lang = req.url.split('/')[2]
    const category = req.url.split('/')[3]
    if (lang && category && _MENU_[lang] && _MENU_[lang][category]) {
      return send(res, 200, _MENU_[lang][category])
    }

    if (lang && _MENU_[lang]) {
      return send(res, 200, _MENU_[lang])
    }

    if (lang) {
      return send(res, 404, 'Language not found')
    }

    return send(res, 200, _MENU_)
  }
  // Lang
  if (req.url.indexOf('/lang') === 0) {
    const lang = req.url.split('/')[2]
    if (lang && _LANG_[lang]) {
      return send(res, 200, _LANG_[lang])
    }

    if (lang) {
      return send(res, 404, 'Language not found')
    }

    return send(res, 200, _LANG_)
  }

  // remove first /
  const path = req.url.slice(1) + '.md'
  // Check if path exists

  if (!_DOC_FILES_[path]) {
    return send(res, 404, 'File not found')
  }
  // Send back doc content
  send(res, 200, _DOC_FILES_[path])
})

module.exports = getFiles()
  .then(() => getReleases())
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      watchFiles()
    }
    const port = process.env.PORT || 4000
    server.listen(port)
    consola.ready(`Server listening on localhost:${port}`)
    return server
  })
