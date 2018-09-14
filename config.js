var path = require('path');
var Nconf = require('nconf');

const _private = {}; // eslint-disable-line no-underscore-dangle
_private.loadNconf = (options = {}) => {
  const nconf = new Nconf.Provider();

  nconf.overrides({
    salt: '!salty'
  });
  
  nconf.file('defaults', path.join(__dirname, 'defaults.json'));

  //
  // Setup nconf to use (in-order):
  //   1. Command-line arguments
  //   2. Environment variables
  //   3. A file located at 'path/to/config.json'
  //
  // nconf.argv()
  //  .env()
  //  .file({ file: 'path/to/config.json' });

  //
  // Set a few variables on `nconf`.
  //
  nconf.set('database:host', '127.0.0.1');
  nconf.set('database:port', 5984);

  return nconf;
}

module.exports.loadNconf = _private.loadNconf;
module.exports = _private.loadNconf();