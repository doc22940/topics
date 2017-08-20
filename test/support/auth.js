'use strict';

var opts = {alias: {password: 'p', username: 'u'}};
var argv = require('minimist')(process.argv.slice(2), opts);
var Store = require('data-store');
var store = new Store('github-base-tests');
var auth = store.get('auth');

if (!auth) {
  auth = {};
  auth.username = argv.username || argv._[0] || process.env.GITHUB_USERNAME;
  auth.password = argv.password || argv._[1] || process.env.GITHUB_PASSWORD;
}

if (auth.username && auth.password) {
  store.set('auth', auth);
} else {
  console.error('please specify authentication details');
  console.error('--username, -u (or first argument)');
  console.error('--password, -p (or second argument)');
  process.exit(1);
}

module.exports = auth;
