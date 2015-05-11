
$(document).ready(function(){

  /*==CREATING THE CONTENT==*/
  var recipe_name = localStorage.recipeName;
  localStorage.removeItem( "recipeName" );
  var path_image = "img/recipe/" +
          recipe_name.charAt(0).toLowerCase() + recipe_name.slice(1) + "/" +
          recipe_name.charAt(0).toLowerCase() + recipe_name.slice(1) +
           ".png";

  /*
  var path_zubereitung = "https://github.com/lichterschalter/HCI_WasKocheIch.git/img/recipe/" +
          recipe_name.charAt(0).toLowerCase() + recipe_name.slice(1) + "/" +
           "Zubereitung.txt";
  var path_zutaten = "https://github.com/lichterschalter/HCI_WasKocheIch.git/img/recipe/" +
         recipe_name.charAt(0).toLowerCase() + recipe_name.slice(1) + "/" +
          "Zutaten.txt";
  $.get(path_zubereitung, function(data) {
     //github als cdn nicht rechtzeitig zum laufen gebracht
  }, 'text');
  */


  $("img").attr({
    "alt" : recipe_name,
    "src" : path_image
  })





}); /*end of document ready*/
