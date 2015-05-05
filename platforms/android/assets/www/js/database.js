var db;
$(document).ready(function(){

  /*CATEGORIES*/
  $("#fruechte").click(function(){
    $("#element_one").attr({
      "src" : "img/ingredient/apfel.png",
      "alt" : "apfel"
    });
    $("#element_two").attr({
      "src" : "img/ingredient/karotte.png",
      "alt" : "karotte"
    });
    $("#element_three").attr({
      "src" : "img/ingredient/broccoli.png",
      "alt" : "broccoli"
    });
    $("#element_four").attr({
      "src" : "img/ingredient/zucchini.png",
      "alt" : "zucchini"
    });
  });

  /*CREATE DATABANK*/
  var nameOfDB = 'Restlverwerter';
  var version = '1.0';
  var displayName = 'Restlverwerter';
  var maxSize = 2 * 1024 * 1024;
  db = openDatabase(nameOfDB, version, displayName, maxSize);
  db.transaction(
    function(transaction) {
      transaction.executeSql(
        'CREATE TABLE IF NOT EXISTS recipe ' +
        '(id INTEGER NOT NULL PRIMARY KEY, ' +
        'name TEXT NOT NULL, ' +
        'description TEXT NOT NULL, ' +
        'image_link TEXT NOT NULL );'
      );
    }
  );
  db.transaction(
    function(transaction) {
      transaction.executeSql(
        'CREATE TABLE IF NOT EXISTS category ' +
        '(id INTEGER NOT NULL PRIMARY KEY, ' +
        'name TEXT NOT NULL, ' +
        'image_link TEXT NOT NULL );'
      );
    }
  );
  db.transaction(
    function(transaction) {
      transaction.executeSql(
        'CREATE TABLE IF NOT EXISTS ingredient ' +
        '(id INTEGER NOT NULL PRIMARY KEY, ' +
        'name TEXT NOT NULL, ' +
        'favorite INTEGER NOT NULL, ' +
        'image_link TEXT NOT NULL, ' +
        'id_category INTEGER NOT NULL,' +
        'FOREIGN KEY(id_category) REFERENCES category(id));'
      );
    }
  );
  db.transaction(
    function(transaction) {
      transaction.executeSql(
        'CREATE TABLE IF NOT EXISTS recipe_has_ingredient ' +
        '(id INTEGER NOT NULL PRIMARY KEY, ' +
        'id_recipe INTEGER NOT NULL , ' +
        'id_ingredient INTEGER NOT NULL, ' +
        'FOREIGN KEY(id_recipe) REFERENCES recipe(id), ' +
        'FOREIGN KEY(id_ingredient) REFERENCES ingredient(id));'
      );
    }
  );


}); /*end of document ready*/
