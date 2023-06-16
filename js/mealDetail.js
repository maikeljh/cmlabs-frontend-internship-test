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
      // Display the meal details
      var mealName = $("<h2>")
        .addClass("text-lg font-bold mb-4")
        .text(meal.strMeal);
      var mealImage = $("<img>")
        .attr("src", meal.strMealThumb)
        .addClass("w-full h-auto mb-4");
      var mealDescription = $("<p>")
        .addClass("mb-2")
        .text(meal.strInstructions);
      var mealRecipe = $("<p>")
        .addClass("mb-2")
        .text("Recipe: " + meal.strSource);
      var mealYoutube = $("<iframe>")
        .attr({
          src: meal.strYoutube.replace("watch?v=", "embed/"),
          width: "100%",
          height: "315",
          frameborder: "0",
          allowfullscreen: "true",
        })
        .addClass("mb-2");

      mealDetailContent.append(mealName);
      mealDetailContent.append(mealImage);
      mealDetailContent.append(mealDescription);
      mealDetailContent.append(mealRecipe);
      mealDetailContent.append(mealYoutube);
    },
    error: function () {
      // Handle error case
      mealDetailContent.text("Failed to fetch meal details.");
    },
  });
}
