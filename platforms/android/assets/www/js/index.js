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
  ==INSERT STATIC DATA TO SQL DATABASE IF IT DOES NOT EXIST==
  1. errorHandler
  2. insert statements in function insertData
  3. if DB is empty - call insertData
  */

  function errorHandler(transaction, error) {
    alert('Oje, da ist etwas mit der Datenbank schiefgegangen: '+error.message+' (Code '+error.code+')');
    return true;
  }

  /*Inserts Data into the DB*/
  function insertData(){

    //the 4 categories
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO category VALUES (1,'Fleisch','img/category/fleisch.png'); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO category VALUES (2,'Getreide','img/category/getreide.png'); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO category VALUES (3,'Milchprodukte','img/category/milchprodukte.png'); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO category VALUES (4,'Fruechte','img/category/fruechte.png'); "
        );
      }
    );

    //ingredients
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (1,'Apfel',0,'img/ingredient/apfel.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (2,'Banane',0,'img/ingredient/banane.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (3,'Blaubeeren',0,'img/ingredient/blaubeeren.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (4,'Broccoli',0,'img/ingredient/broccoli.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (5,'Pilze',0,'img/ingredient/pilze.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (6,'Erbsen',0,'img/ingredient/erbsen.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (7,'Erdbeere',0,'img/ingredient/erdbeere.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (8,'Karotte',0,'img/ingredient/karotte.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (9,'Kartoffel',0,'img/ingredient/kartoffel.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (10,'Kuerbis',0,'img/ingredient/kuerbis.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (11,'Melanzani',0,'img/ingredient/melanzani.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (12,'Paprika',0,'img/ingredient/paprika.png',4 ); "
        );
      }
    );

    //recipes
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO recipe VALUES (1,'Eintopf','alles in den eintopf', 'img/ingredient/paprika.png' ); "
        );
      }
    );

    //recipe_has_ingredient
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          //id, id_recipe, id_ingredient
          "INSERT INTO recipe VALUES (1, 1, 1 ); "
        );
      }
    );

  }

  /*Test if there are rows in DB*/
  db.transaction(
    function(transaction) {
      transaction.executeSql(
        'SELECT * FROM category,ingredient,recipe; ',
        [],
        function (transaction, result) {
          row = [];
          for( var i = 0; i < result.rows.length; i++ ){
            row[ i ] = result.rows.item( i );
          } /*end for*/
          if( row.length < 2 ){
            insertData();
          }
        }, /*end function (transaction, result) */
        errorHandler
      ); /*end transaction.executeSql*/
    }/*end function(transaction)*/
  );/*end db.transaction*/



  /*
  ==USER SELECTS CATEGORY==
  If one of the 4 categories on the top is clicked,
  the elements below in the slide element (carousel),
  are filled with the images of the ingredients of the specific categorie
  */
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
              row = [];
              for( var i = 0; i < result.rows.length; i++ ){
                row[ i ] = result.rows.item( i );
                if( i == (result.rows.length-1) ){

                  //first 16 elements
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

                  //second sixteen elements

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
  $(".thumbnail").on('click', (function(){
    var ingredient_name = $(this).children('img').attr("alt");
    var already_in_list = false;

    //check if clicked thumbnail is ingredient element
    if( ingredient_name != "Fruechte" && ingredient_name != "Getreide" &&
    ingredient_name != "Milchprodukte" && ingredient_name != "Fleisch") {

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
          "<ul class='list-group' id=" + $(this).children('img').attr("alt") + ">" +
            "<li class='list-group-item'>" +
              "<button type='submit' class='btn btn-default'>" +
                "<span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span>" +
                "<span class='sr-only'>Favorit</span>" +
              "</button>" + " " +
              $(this).children('img').attr("alt") + " " +
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
        $("#ingredient_list").children("ul").remove( "#" + ingredient_name );
      }/*end else*/

    }/* eind if not thumbnail*/
  }));/*end of jquery onclick*/


  /*==USER CLICKS TRASH==*/
  $(".trash").on('click', (function(){
    console.log("sd");
    $(this).great-grandparent().remove();
  }));/*end of jquery onclick*/


  /*==USER CLICKS COOK BUTTON==*/



}); /*end of document ready*/
