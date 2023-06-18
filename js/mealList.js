$(document).ready(function () {
  // Get title
  var mealListTitle = $("#mealListTitle");

  // Get list
  var mealList = $("#mealList");

  // Get navigation
  var navigationHistory = $("#navigationHistory");

  // Get category
  var urlParams = new URLSearchParams(window.location.search);
  var category = urlParams.get("category");

  // Create navigation elements
  navigationHistory.append(
    $("<a>", {
      href: "/index.html",
      text: "Home",
    })
  );

  navigationHistory.append(
    $("<span>", {
      text: " > ",
    })
  );

  navigationHistory.append(
    $("<span>", {
      text: category,
      class: "text-gray-400",
    })
  );

  // Set meal title
  mealListTitle.text(category + " Meals");
  mealList.empty();

  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/filter.php",
    method: "GET",
    data: {
      c: category,
    },
    success: function (response) {
      // Iterate each meal
      $.each(response.meals, function (index, meal) {
        // Create meal card element
        var mealCard = $("<div>", {
          class: "relative bg-white rounded-lg overflow-hidden cursor-pointer",
        });

        // Create meal image element
        var mealImage = $("<img>", {
          src: meal.strMealThumb,
          alt: meal.strMeal,
          class: "w-full h-32 object-cover",
        });

        // Create meal content element
        var mealContent = $("<div>", {
          class: "absolute inset-0 flex flex-col items-center justify-center",
        });

        // Create overlay within card
        var overlay = $("<div>", {
          class: "absolute inset-0 bg-black opacity-50",
        });

        // Create meal name element
        var mealName = $("<h3>", {
          text: meal.strMeal,
          class: "font-bold text-lg text-white text-center",
        });

        // Combine all elements
        mealContent.append(mealName);
        mealCard.append(mealImage);
        mealCard.append(overlay);
        mealCard.append(mealContent);
        mealList.append(mealCard);

        // Click event for meal card
        mealCard.click(function () {
          var mealId = meal.idMeal;
          window.location.href = "/mealDetail.html?mealId=" + mealId;
        });
      });
    },
    // Handle error case
    error: function () {
      mealListTitle.text("Error loading meals");
    },
  });
});
