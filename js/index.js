$(document).ready(function () {
  var categoryListTitle = $("#categoryListTitle");
  var categoryList = $("#categoryList");

  categoryListTitle.text("Categories");
  categoryList.empty();

  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    method: "GET",
    success: function (response) {
      $.each(response.categories, function (index, category) {
        var categoryCard = $("<div>", {
          class: "relative bg-white rounded-lg overflow-hidden cursor-pointer",
        });

        var categoryImage = $("<img>", {
          src: category.strCategoryThumb,
          alt: category.strCategory,
          class: "w-full h-32 object-cover",
        });

        var overlay = $("<div>", {
          class: "absolute inset-0 bg-black opacity-50",
        });

        var categoryName = $("<h3>", {
          text: category.strCategory,
          class:
            "absolute inset-0 flex items-center justify-center font-bold text-lg text-white",
        });

        categoryCard.append(categoryImage);
        categoryCard.append(overlay);
        categoryCard.append(categoryName);
        categoryList.append(categoryCard);

        // Click event for category card
        categoryCard.click(function () {
          var categoryName = category.strCategory;
          window.location.href = "mealList.html?category=" + categoryName;
        });
      });
    },
    error: function () {
      categoryListTitle.text("Error loading categories");
    },
  });
});
