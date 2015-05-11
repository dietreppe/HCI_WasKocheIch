var db;

$(document).ready(function(){
  $.ajaxSetup({'async': false});
  var last_selected_category = null;
  var ingredient_list = [];

  /*==HIDE SLIDESHOW AND COOK BUTTON AT THE BEGINNING==*/
  $("#myCarousel").hide();
  $("#cook_button").hide();

  /*
  ==CREATE WEBSQL DATABASE==
  */
  var nameOfDB = 'Restlverwerter';
  var version = '1.0';
  var displayName = 'Restlverwerter';
  var maxSize = 2 * 1024 * 1024;
  db = openDatabase(nameOfDB, version, displayName, maxSize);
  //localStorage.setItem("db", db);
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


    //ingredients for fruechte
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (1,'Apfel',0,'img/ingredient/apfel.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (2,'Banane',0,'img/ingredient/banane.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (3,'Blaubeeren',0,'img/ingredient/blaubeeren.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (4,'Broccoli',0,'img/ingredient/broccoli.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (5,'Pilze',0,'img/ingredient/pilze.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (6,'Erbsen',0,'img/ingredient/erbsen.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (7,'Erdbeere',0,'img/ingredient/erdbeere.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (8,'Radischen',0,'img/ingredient/radischen.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (9,'Kartoffel',0,'img/ingredient/kartoffel.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (10,'Kuerbis',0,'img/ingredient/kuerbis.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (11,'Melanzani',0,'img/ingredient/melanzani.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (12,'Paprika',0,'img/ingredient/paprika.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (13,'Salat',0,'img/ingredient/salat.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (14,'Himbeere',0,'img/ingredient/himbeere.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (15,'Zucchini',0,'img/ingredient/zucchini.png',4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (16,'Zwiebel',0,'img/ingredient/zwiebel.png',4 ); "
        );
      }
    );


    //ingredients for getreide
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (17,'Brot',0,'img/ingredient/brot.png',2 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (18,'Mehl',0,'img/ingredient/mehl.png',2 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (19,'Reis',0,'img/ingredient/reis.png',2 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (20,'Spaghetti',0,'img/ingredient/spaghetti.png',2 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (21,'Farfalle',0,'img/ingredient/farfalle.jpg',2 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (22,'Ringelnudel',0,'img/ingredient/ringelnudel.jpg',2 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (23,'Rippnudel',0,'img/ingredient/rippnudel.jpg',2 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (24,'Penne',0,'img/ingredient/penne.jpg',2 ); "
        );
      }
    );


    //ingredients for milchprodukte
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (33,'Butter',0,'img/ingredient/butter.png',3 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (34,'Eier',0,'img/ingredient/eier.png',3 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (35,'Feta',0,'img/ingredient/feta.png',3 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (36,'Kaese',0,'img/ingredient/kaese.png',3 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (37,'Milch',0,'img/ingredient/milch.png',3 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (38,'Mozzarella',0,'img/ingredient/mozzarella.png',3 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (39,'Sahne',0,'img/ingredient/sahne.png',3 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (40,'Yogurt',0,'img/ingredient/yogurt.jpg',3 ); "
        );
      }
    );


    //ingredients for fleisch
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (48,'Faschiertes',0,'img/ingredient/faschiertes.png',1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (49,'Fisch',0,'img/ingredient/fisch.png',1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (50,'Huehnerbrust',0,'img/ingredient/huehnerbrust.png',1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (51,'Salami',0,'img/ingredient/salami.png',1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (52,'Schinken',0,'img/ingredient/schinken.jpg',1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (53,'Huehnerkeule',0,'img/ingredient/huehnerkeule.jpg',1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (54,'Speck',0,'img/ingredient/speck.jpg',1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, name, favorite, image_link, id_category
        transaction.executeSql(
          "INSERT INTO ingredient VALUES (55,'Frankfurter',0,'img/ingredient/frankfurter.jpg',1 ); "
        );
      }
    );



    //recipes
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO recipe VALUES (1,'Eintopf','alles in den eintopf', 'img/recipe/eintopf/eintopf.png' ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO recipe VALUES (2,'Minestrone','alles in den minestrone', 'img/recipe/minestrone/minestrone.png' ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO recipe VALUES (3,'Restlessen','alles in den reslttopf', 'img/recipe/restlessen/restlessen.png' ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO recipe VALUES (4,'Salat','alles in den salat', 'img/recipe/salat/salat.jpg' ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          "INSERT INTO recipe VALUES (5,'Kuerbissuppe','alles in den suppentopf', 'img/recipe/kuerbissuppe/kuerbissuppe.jpg' ); "
        );
      }
    );



    //recipe_has_ingredient
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (1, 1, 1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (2, 1, 2 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (3, 2, 1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (4, 2, 3 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (5, 1, 1 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (6, 1, 3 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (7, 1, 4 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (8, 1, 5 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (9, 1, 6); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (10, 1, 7 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (11, 1, 8 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (12, 1, 17 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (13, 1, 18 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (14, 1, 19 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (15, 1, 20 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (16, 1, 21 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (17, 1, 22 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (18, 1, 33 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (19, 1, 34 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (20, 1, 35 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (21, 1, 36 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (22, 1, 37 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (23, 1, 38 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (24, 1, 39 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (25, 1, 40 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (26, 5, 10 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (27, 4, 13 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (28, 3, 55 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (29, 3, 54 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (30, 3, 53 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (31, 3, 52 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (32, 3, 51 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (33, 3, 50 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (34, 3, 49 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (35, 3, 48 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (36, 3, 40 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (37, 3, 39 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (38, 3, 38 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (39, 3, 37 ); "
        );
      }
    );
    db.transaction(
      function(transaction) {
        //id, id_recipe, id_ingredient
        transaction.executeSql(
          "INSERT INTO recipe_has_ingredient VALUES (40, 3, 36 ); "
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
  $(".thumbnail").on('click', (function(event){
    if( $(this).context.id == "category" ){

      //get name of category
      var category_name = $(this).children("img").attr("id");

      //if user presses twice the same category, hide carousel (slideshow)
      if(last_selected_category == category_name){
        $("#myCarousel").hide();
        last_selected_category = null;
      }else if( last_selected_category != category_name ){
        $("#myCarousel").show();
        last_selected_category = category_name;

        //start database transaction
        db.transaction(
          function(transaction) {
            console.log(category_name),
            transaction.executeSql(
              'SELECT ingredient.name, ingredient.image_link ' +
              'FROM ingredient, category ' +
              'WHERE ingredient.id_category = category.id AND category.name = ?; ',
              [category_name],
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

                  } /*end if*/

                } /*end for*/
              }, /*end function (transaction, result) */
              errorHandler
            ); /*end transaction.executeSql*/
          }/*end function(transaction)*/
        );/*end db.transaction*/
      }/*end else*/
    }/*end if id="category"*/

  }));/*end of jqery onclick action */


  /*==USER SELECTS INGREDIENT==*/
  $(".thumbnail").on('click', (function(){
    var ingredient_name = $(this).children('img').attr("alt");
    var already_in_list = false;

    //check if clicked thumbnail is ingredient element
    if( ingredient_name != "Fruechte" && ingredient_name != "Getreide" &&
    ingredient_name != "Milchprodukte" && ingredient_name != "Fleisch" &&
    ingredient_name != "Leer") {

      /*check if ingredient is already selected*/
      for( var i = 0; i < ingredient_list.length; ++i ){
        if( ingredient_list[ i ] == ingredient_name ){
          already_in_list = true;
        }
      }

      /*write html and save ingredient to ingredient_list*/
      if( already_in_list == false ){
        ingredient_list.push( ingredient_name );
        localStorage[ "ingredient_list" ] = JSON.stringify( ingredient_list );
        $("#ingredient_list").append(
          "<ul class='list-group' id='" + $(this).children('img').attr("alt") + "'>" +
            "<li class='list-group-item'>" +
              "<button type='submit' class='btn btn-default' id='" + $(this).children('img').attr("alt") + "'>" +
                "<span class='glyphicon glyphicon-star-empty' aria-hidden='true' id='" + $(this).children('img').attr("alt") + "'>" +
                "</span>" +
                "<span class='sr-only'>Favorit</span>" +
              "</button>" + " " +
              $(this).children('img').attr("alt") + " " +
              "<button type='submit' class='btn btn-default' id='" + $(this).children('img').attr("alt") + "'>" +
                "<span class='glyphicon glyphicon-trash' aria-hidden='true' id='" + $(this).children('img').attr("alt") + "'>" +
                "</span>" +
                "<span class='sr-only'>Löschen</span>" +
              "</button>" +
            "</li>" +
          "</ul>"
        )
      }else{
        /*delete ingredient from ingredient_list and from the screen*/
        var index = ingredient_list.indexOf( ingredient_name );
        if( index > -1 ) ingredient_list.splice( index, 1 );
        localStorage[ "ingredient_list" ] = JSON.stringify( ingredient_list );
        $("#ingredient_list").children("ul").remove( "#" + ingredient_name );
      }/*end else*/

      //hide cook button if no ingredients are selected, else show it
      if( ingredient_list.length < 1 ){
        $("#cook_button").hide();
      }else{
        $("#cook_button").show();
      }

    }/* eind if not thumbnail*/
  }));/*end of jquery onclick*/


  /*==USER CLICKS TRASH==*/
  $("#ingredient_list").on('click', (function(event){

    //delete list element
    var element_name = event.target.id;
    $(this).children("#" + element_name).remove();
    var index = ingredient_list.indexOf( element_name );
    if( index > -1 ) ingredient_list.splice( index, 1 );
    localStorage[ "ingredient_list" ] = JSON.stringify( ingredient_list );

    //hide cook button if no ingredients are selected, else show it
    if( ingredient_list.length < 1 ){
      $("#cook_button").hide();
    }else{
      $("#cook_button").show();
    }
  }));/*end of jquery onclick*/

}); /*end of document ready*/
