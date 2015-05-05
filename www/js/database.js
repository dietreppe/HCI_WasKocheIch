var db;
$(document).ready(function(){
  var nameOfDB = 'Restlverwerter';
  var version = '1.0';
  var displayName = 'Restlverwerter';
  var maxSize = 65536;
  db = openDatabase(nameOfDB, version, displayName, maxSize);
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          'CREATE TABLE IF NOT EXISTS recipe ' +
          '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
          'name TEXT NOT NULL, ' +
          'description TEXT NOT NULL, ' +
          'image_link TEXT NOT NULL );'
        );
        transaction.executeSql(
          'CREATE TABLE IF NOT EXISTS ingredient ' +
          '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
          'name TEXT NOT NULL, ' +
          'favorite INT NOT NULL, ' +
          'image_link TEXT NOT NULL ' +
          'id_category INT NOT TULL );'
        );

        transaction.executeSql(
          'CREATE TABLE IF NOT EXISTS category ' +
          '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
          'name TEXT NOT NULL, ' +
          'image_link TEXT NOT NULL );'
        );

        transaction.executeSql(
          'CREATE TABLE IF NOT EXISTS recipe_has_ingredient' +
          '(id_category INTEGER NOT NULL PRIMARY KEY, ' +
          'id_ingredient INTEGER NOT NULL PRIMARY KEY, );'
        );
      }
    );
});
