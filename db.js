var Bookshelf = require('bookshelf');

var config = {
   host: '127.0.0.1',  // your host
   user: 'username', // your database user
   password: 'password', // your database password
   database: 'publisher',
   charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
   client: 'mysql', 
   connection: config
});

module.exports.DB = DB;