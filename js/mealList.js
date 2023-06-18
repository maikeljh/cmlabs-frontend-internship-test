$(document).ready(function () {
  var mealListTitle = $("#mealListTitle");
  var mealList = $("#mealList");
  var navigationHistory = $("#navigationHistory");
  var urlParams = new URLSearchParams(window.location.search);
  var category = urlParams.get("category");

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
    $("<span>", {
      text: category,
      class: "text-gray-400",
    })
  );

  mealListTitle.text(category + " Meals");
  mealList.empty();

  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/filter.php",
    method: "GET",
    data: {
      c: category,
    },
    success: function (response) {
      $.each(response.meals, function (index, meal) {
        var mealCard = $("<div>", {
          class: "relative bg-white rounded-lg overflow-hidden cursor-pointer",
        });

        var mealImage = $("<img>", {
          src: meal.strMealThumb,
          alt: meal.strMeal,
          class: "w-full h-32 object-cover",
        });

        var mealContent = $("<div>", {
          class: "absolute inset-0 flex flex-col items-center justify-center",
        });

        var overlay = $("<div>", {
          class: "absolute inset-0 bg-black opacity-50",
        });

        var mealName = $("<h3>", {
          text: meal.strMeal,
          class: "font-bold text-lg text-white text-center",
        });

        mealContent.append(mealName);
        mealCard.append(mealImage);
        mealCard.append(overlay);
        mealCard.append(mealContent);
        mealList.append(mealCard);

        // Click event for meal card
        mealCard.click(function () {
          var mealId = meal.idMeal;
          window.location.href = "mealDetail.html?mealId=" + mealId;
        });
      });
    },
    error: function () {
      mealListTitle.text("Error loading meals");
    },
  });
});
