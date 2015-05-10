var db;

$(document).ready(function(){
  var slideshow_open = false;
  var ingredient_list = [];

  /*==HIDE SLIDESHOW AT THE BEGINNING==*/
  $("#myCarousel").hide();

  /*
  ==CREATE WEBSQL DATABASE==
  */
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


  /*
  ==USER SELECTS CATEGORY==
  If one of the 4 categories on the top is clicked,
  the elements below in the slide element (carousel),
  are filled with the images of the ingredients of the specific categorie
  */
  function errorHandler(transaction, error) {
    alert('Oje, da ist etwas mit der Datenbank schiefgegangen: '+error.message+' (Code '+error.code+')');
    return true;
  }

  $("#fruechte").on('click', (function(){
    if(slideshow_open){
      $("#myCarousel").hide();
      slideshow_open = false;
    }else{
      $("#myCarousel").show();
      slideshow_open = true;
      db.transaction(
        function(transaction) {
          transaction.executeSql(
            'SELECT ingredient.name, ingredient.image_link ' +
            'FROM ingredient, category ' +
            'WHERE category.name = ?; ',
            ['fruechte'],
            function (transaction, result) {
              alert("in the function, yeah!!");
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
                } /*end if*/
              } /*end for*/
            }, /*end function (transaction, result) */
            errorHandler
          ); /*end transaction.executeSql*/
        }/*end function(transaction)*/
      );/*end db.transaction*/
    }/*end else*/

  }));/*end of jqery onclick action on #fruecht */


  /*==USER SELECTS INGREDIENT==*/
  $("#element_one").on('click', (function(){
    var ingredient_name = $("#element_one").attr("alt");
    var already_in_list = false;

    /*check if ingredient is already selected*/
    for( var i = 0; i < ingredient_list.length; ++i ){
      if( ingredient_list[ i ] == ingredient_name ){
        already_in_list = true;
      }
    }

    /*write html and save ingredient to ingredient_list*/
    if( already_in_list == false ){
      ingredient_list.push( ingredient_name );
      $("#ingredient_list").append(
        "<ul class='list-group'>" +
          "<li class='list-group-item'>" +
            "<button type='submit' class='btn btn-default'>" +
              "<span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span>" +
              "<span class='sr-only'>Favorit</span>" +
            "</button>" + " " +
            $("#element_one").attr("alt") + " " +
            "<button type='submit' class='btn btn-default'>" +
              "<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>" +
              "<span class='sr-only'>Löschen</span>" +
            "</button>" +
          "</li>" +
        "</ul>"
      )
    }else{
      /*delete ingredient from ingredient_list and from the screen*/
      var index = ingredient_list.indexOf( ingredient_name );
      if( index > -1 ) ingredient_list.splice( index, 1 );
      $("#ingredient_list").empty();
    }
  }));/*end of jquery onclick*/


}); /*end of document ready*/
