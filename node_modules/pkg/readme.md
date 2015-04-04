# pkg

A Node.js module for reading/editting/writing package.json files.

## Install

```bash
$ npm install pkg
```

## Usage

```javascript
var pkg = require('pkg');

var file = pkg.read(module);

file.version();  // "1.2.3-4"
file.version({ parse: true });  // {major: 1, minor: 2, patch: 3, build: 4}

file.incVersion('build');

file.version();  // "1.2.3-5"

file.writeSync();
```

## API

#### pkg.read ( Mixed fileOrModule[, Function callback ])

Creates a new pkg.Package object. The `fileOrModule` argument can be a file path to a package.json file or a module object. If a callback is given, the file will be read async, otherwise it will be read sync.

```javascript
var file1 = pkg.read(module);
var file2 = pkg.read('../foo/package.json', function() {
	// ...
});
```

#### pkg.Package ( Mixed fileOrModule )

Inherits the `File` constructor from [json-file](https://github.com/UmbraEngineering/json-file#jsonfile--string-filepath-).

#### Package::version ([ Object opts ])

Reads the `version` property from the file data. If a `{parse: true}` option is given, the version will be parsed onto an object like this:

```json
{
	"major": 1,
	"minor": 0,
	"patch": 3,
	"build": 5
}
```

#### Package::incVersion ( String release )

Increments the version in the file data. `release` is which part of the version to increment.

```javascript
file.version();  // 1.2.3-4
file.incVersion('minor');
file.version();  // 1.3.0-0
```

