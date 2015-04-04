
var fs      = require('fs');
var path    = require('path');
var json    = require('json-file');
var semver  = require('semver');

exports.read = function(fileOrModule, callback) {
	var pkg = new Package(fileOrModule);
	if (callback) {
		pkg.read(callback);
	} else {
		pkg.readSync();
	}
	return pkg;
};

var Package = exports.Package = function(fileOrModule) {
	var file = fileOrModule;
	if (typeof file === 'object') {
		file = path.join(path.dirname(file.filename), 'package.json');
	}
	json.File.call(this, file);
};

Package.prototype = new json.File('');

Package.prototype.version = function(opts) {
	opts = opts || { };
	
	var version = this.data.version;
	
	if (opts.parse) {
		if (version = semvar.valid(version)) {
			version = {
				major: version[1],
				minor: version[2],
				patch: version[3],
				build: version[4],
				tag:   version[5]
			};
		}
	}
	
	return version;
};

Package.prototype.incVersion = function(release) {
	this.data.version = semver.inc(this.data.version, release);
};

