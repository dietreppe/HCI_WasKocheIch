function rezepte(){

var ingredients=JSON.parse(localStorage["ingredients"]);

var ingridient_list=[];

var nameOfDB = 'Restlverwerter';
var version = '1.0';
var displayName = 'Restlverwerter';
var maxSize = 2 * 1024 * 1024;
db = openDatabase(nameOfDB, version, displayName, maxSize);
  for(int i=0;i<ingredients.length;i++){
    db.transaction(
      function(transaction) {
        transaction.executeSql(
          'SELECT id_recipe, id_ingredient, name'+
          'FROM recipe_has_ingredient INNER JOIN recipe'+
          'ON recipe_has_ingredient.id_recipe = recipe.id_recipe'+
          'WHERE id_ingridient=ingridient_list[i]'
        );
      }
    );
  }


  document.write(
   "<li class=\"list-group-item\">"+
    "<img src=\"img/recipe/eintopf.png\" heigth=10% >"+
    "<a href=\"\">Eintopf</a>"+
    "</li>"
  );

}
