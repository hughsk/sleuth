var isRequire = require('is-require')('require')
var evaluate  = require('static-eval')
var astw      = require('astw')

module.exports = sleuth

function sleuth(walk) {
  var discovered = {}

  if (typeof walk !== 'function') {
    walk = astw(walk)
  }

  walk(function(node) {
    if (!isRequire(node)) return
    if (node.parent.type !== 'VariableDeclarator') return

    var path = node.arguments.length && (
      node.arguments[0].type === 'Literal'
        ? node.arguments[0].value
        : evaluate(node.arguments[0])
    )

    var name = (
      node.parent.id &&
      node.parent.id.name
    )

    if (path && name) {
      discovered[name] = path
    }
  })

  return discovered
}
