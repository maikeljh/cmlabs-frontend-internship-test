$(document).ready(function () {
  // Get the mealId from the URL parameter
  var urlParams = new URLSearchParams(window.location.search);
  var mealId = urlParams.get("mealId");

  // Fetch meal details using the mealId
  fetchMealDetails(mealId);
});

function fetchMealDetails(mealId) {
  var mealDetailContent = $("#mealDetailContent");

  // Make an API request to fetch meal details using the mealId
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId,
    method: "GET",
    success: function (response) {
      var meal = response.meals[0];

      // Update navigation
      var navigationHistory = $("#navigationHistory");

      navigationHistory.append(
        $("<a>", {
          href: "/html/index.html",
          text: "Home",
        })
      );

      navigationHistory.append(
        $("<span>", {
          text: " > ",
        })
      );

      navigationHistory.append(
        $("<a>", {
          href: "/html/mealList.html?category=" + meal.strCategory,
          text: meal.strCategory,
        })
      );

      navigationHistory.append(
        $("<span>", {
          text: " > ",
        })
      );

      navigationHistory.append(
        $("<span>", {
          text: meal.strMeal,
          class: "text-gray-400",
        })
      );

      // Display the meal details
      var mealName = $("<h2>")
        .addClass(
          "text-2xl sm:text-5xl font-semibold mb-4 border-b-2 sm:pb-6 text-center"
        )
        .text(meal.strMeal);
      var mealRecipe = $("<div>").addClass("flex flex-col sm:flex-row gap-8");
      var mealImage = $("<img>")
        .attr("src", meal.strMealThumb)
        .addClass("w-1/2 lg:w-auto h-auto sm:mb-8 mx-auto");
      var mealRecipeDetail = $("<div>").addClass(
        "flex flex-col w-full sm:w-auto mx-auto sm:mb-0 mb-8"
      );
      var mealRecipeTitle = $("<p>")
        .addClass(
          "text-xl sm:text-3xl font-semibold mb-4 border-b-2 sm:pb-6 text-center"
        )
        .text("Recipe");
      var mealListIngredient = $("<ol>").addClass(
        "list-decimal mx-auto sm:mx-0"
      );
      for (var i = 1; i <= 20; i++) {
        var ingredient = meal["strIngredient" + i];
        var quantity = meal["strMeasure" + i];
        if (ingredient != "") {
          mealListIngredient.append(
            $("<li>").text(quantity + " " + ingredient)
          );
        }
      }
      var mealInstruction = $("<p>")
        .addClass(
          "text-xl sm:text-3xl font-semibold mb-4 border-b-2 sm:pb-6 text-center"
        )
        .text("Instruction");
      var mealDescription = $(`<pre style="font-family: inherit">`)
        .addClass("mb-8 text-justify whitespace-pre-wrap")
        .text(meal.strInstructions);
      var mealYoutubeTitle = $("<p>")
        .addClass(
          "text-xl sm:text-3xl font-semibold mb-4 border-b-2 sm:pb-6 text-center"
        )
        .text("Tutorials");
      var mealYoutube = $("<iframe>")
        .attr({
          src: meal.strYoutube.replace("watch?v=", "embed/"),
          width: "100%",
          height: "500",
          frameborder: "0",
          allowfullscreen: "true",
        })
        .addClass("mb-2");

      mealDetailContent.append(mealName);
      mealRecipe.append(mealImage);
      mealRecipe.append(mealRecipeDetail);
      mealRecipeDetail.append(mealRecipeTitle);
      mealRecipeDetail.append(mealListIngredient);
      mealDetailContent.append(mealRecipe);
      mealDetailContent.append(mealInstruction);
      mealDetailContent.append(mealDescription);
      mealDetailContent.append(mealYoutubeTitle);
      mealDetailContent.append(mealYoutube);
    },
    error: function () {
      // Handle error case
      mealDetailContent.text("Failed to fetch meal details.");
    },
  });
}
