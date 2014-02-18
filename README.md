# sleuth [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/sleuth&title=sleuth&description=hughsk/sleuth%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Like detective, find all calls to require by walking the AST, however also supply the variable name used if available

## Usage ##

[![sleuth](https://nodei.co/npm/sleuth.png?mini=true)](https://nodei.co/npm/sleuth)

### `requires = sleuth(walk|ast|src)` ###

Takes either:

* Plain JavaScript: `src`.
* An [esprima](http://github.com/ariya/esprima)-like `ast` object.
* A `walk` function, which is expected to take a function and call it on
  each node in the tree. Mostly for ease of use with modules like
  [astw](http://github.com/substack/astw).

Returns an object whose keys represent the variable names used to require a
module, and whose values are the required module strings detected.

## Example ##

``` javascript
var esprima = require('esprima')
var walkers = require('astw')
var files = require('fs')

var src = files.readFileSync(__filename, 'utf8')
var ast = esprima.parse(src)

// Walk the generated AST
var result = sleuth(ast)
console.log(result)

// Or you can try it this way:
var result = sleuth(walkers(src))
console.log(result)
```

Which should give you back something like this:

``` javascript
{
  esprima: 'esprima',
  walkers: 'astw',
  files: 'fs'
}
```

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/sleuth/blob/master/LICENSE.md) for details.
