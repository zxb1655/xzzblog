const viewGenerator = require('./scripts/plop/view/prompt')

module.exports = function (plop) {
  plop.setGenerator('view', viewGenerator)
}
