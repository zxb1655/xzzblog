const pwd = process.cwd()
const path = require('path')
const package = require('../../package.json')
const { upload } = require('./upload')

const ossBasePath = package.name

function start() {
  upload(path.join(pwd, `/${package.entry}/`), `${ossBasePath}`)
}

start()
