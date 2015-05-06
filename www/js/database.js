var db;
$(document).ready(function(){

  /*CATEGORIES
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
  });*/


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


  /*SQL QUERY FOR CATEGORIES*/
  function errorHandler(transaction, error) {
    alert('Oje, da ist etwas mit der Datenbank schiefgegangen: '+error.message+' (Code '+error.code+')');
    return true;
  }

  $("#fruechte").on('click', (function(){
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          'SELECT ingredient.name, ingredient.image_link ' +
          'FROM ingredient, category ' +
          'WHERE category.name = ?; ',
          ['fruechte'],
          function (transaction, result) {
            row = [];
            for( var i = 0; i < result.rows.length; i++ ){
              row[ i ] = result.rows.item( i );
              if( i == (result.rows.length-1) ){
                $("#element_one").attr({
                  "alt" : row[ 0 ].name,
                  "src" : row[ 0 ].image_link
                });
                $("#element_two").attr({
                  "alt" : row[ 1 ].name,
                  "src" : row[ 1 ].image_link
                });
                $("#element_three").attr({
                  "alt" : row[ 2 ].name,
                  "src" : row[ 2 ].image_link
                });
                $("#element_four").attr({
                  "alt" : row[ 3 ].name,
                  "src" : row[ 3 ].image_link
                });
                $("#element_five").attr({
                  "alt" : row[ 4 ].name,
                  "src" : row[ 4 ].image_link
                });
                $("#element_six").attr({
                  "alt" : row[ 5 ].name,
                  "src" : row[ 5 ].image_link
                });
                $("#element_seven").attr({
                  "alt" : row[ 6 ].name,
                  "src" : row[ 6 ].image_link
                });
                $("#element_eigth").attr({
                  "alt" : row[ 7 ].name,
                  "src" : row[ 7 ].image_link
                });
              }
            }
          },
          errorHandler
        );
      }
    );

  }));


}); /*end of document ready*/
