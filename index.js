var isRequire = require('is-require')('require')
var evaluate  = require('static-eval')

module.exports = sleuth

function sleuth(ast) {
  var discovered = {}
  var nodes = ast.body
  var l = nodes.length

  for (var i = 0; i < l; i++) {

    if (nodes[i].type === 'VariableDeclaration') {

      var declarations = nodes[i].declarations
      var d = declarations.length

      for (var j = 0; j < d; j++) {
        var node = declarations[j]

        if (node.type !== 'VariableDeclarator') continue

        var path = getPath(node.init)

        var name = (
          node.id &&
          node.id.name
        )

        if (path && name) {
          discovered[name] = path
        }
      }

    } else if (nodes[i].type === 'ExpressionStatement') {

      if (nodes[i].expression.type !== 'AssignmentExpression') continue

      var path = getPath(nodes[i].expression.right)
      var name = nodes[i].expression.left.name

      if (path && name) {
        discovered[name] = path
      }
    }

  }

  return discovered
}

function getPath(init) {
  return (
    isRequire(init) &&
    init.arguments.length && (
      init.arguments[0].type === 'Literal'
        ? init.arguments[0].value
        : evaluate(init.arguments[0])
    )
  )
}
