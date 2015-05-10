
//var db = localStorage.getItem("db");
var db;

$(document).ready(function(){

  var nameOfDB = 'Restlverwerter';
  var version = '1.0';
  var displayName = 'Restlverwerter';
  var maxSize = 2 * 1024 * 1024;
  db = openDatabase(nameOfDB, version, displayName, maxSize);

  /*==CREATING THE LIST==*/
    //take ingredient_list from lokalStorage
    ingredient_list = JSON.parse(localStorage["ingredient_list"]);

    //error handler
    function errorHandler(transaction, error) {
      alert('Oje, da ist etwas mit der Datenbank schiefgegangen: '+error.message+' (Code '+error.code+')');
      return true;
    }

    //sql query to get recepies for ingredients
    console.log("ingredient_list: " + ingredient_list);

    db.transaction(
      function(transaction) {

        //für jede zutat nach rezepten suchen
        for( var i = 0; i < ingredient_list.length; ++i){
          tmpIngredient = ingredient_list[ i ];
          transaction.executeSql(
            "SELECT recipe.name, recipe.image_link FROM recipe, ingredient, recipe_has_ingredient " +
            "WHERE recipe_has_ingredient.id_recipe = recipe.id AND " +
            "recipe_has_ingredient.id_ingredient = ingredient.id AND " +
            "ingredient.name = ?; ",
            [ tmpIngredient ],
            function (transaction, result) {
              row = [];
              for( var i = 0; i < result.rows.length; i++ ){

                //gefundenen rezepte anzeigen
                row[ i ] = result.rows.item( i );
                if( $("#" + row[i].name).length == 0 ){//check if recipe is already in list
                  console.log( row[ i ] );
                  $("#ingredient_list").append(
                    "<ul class='list-group'>" +
                      "<a href='#' class='thumbnail'>" +
                        "<li class='list-group-item' class='no_underline'>" +
                          "<img src=" + row[i].image_link + " class ='recipe_image'" +
                          "alt=" + row[i].name + " id=" + row[i].name + ">" +
                          " " + row[i].name +
                        "</li>" +
                      "</a>" +
                    "</ul>"
                  )
                }/*end if*/
              } /*end inner for*/
            }, /*end function (transaction, result) */
            errorHandler
          ); /*end transaction.executeSql*/
        }/*end outer for*/
      }/*end of function(transaction)*/
    );/*end db.transaction*/

    $("#ingredient_list").on('click', (function(){
      console.log("hallo");
      console.log($(this).children().first().children().first().id);
      localStorage.recipeName = $(this).children().first().children().first().id;
    }));/*end of jquery onclick*/


}); /*end of document ready*/


// "SELECT * FROM recipe, ingredient WHERE ingredient.name = ?; ",
