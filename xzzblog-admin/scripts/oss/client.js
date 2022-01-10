const OSS = require('ali-oss')
const OSSConfig = require('./config')

const BUILD_FOR = process.env.BUILD_FOR

let client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: OSSConfig.accessKeyId,
  accessKeySecret: OSSConfig.accessKeySecret
})

console.log(`mw${BUILD_FOR ? '-' + BUILD_FOR : ''}`)
client.useBucket(`mw${BUILD_FOR ? '-' + BUILD_FOR : ''}`)

module.exports = {
  client
}
