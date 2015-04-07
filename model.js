var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'publisher',
   idAttribute: 'id',
});

module.exports = {
   User: User
};