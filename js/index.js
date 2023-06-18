$(document).ready(function () {
  // Get element title
  var categoryListTitle = $("#categoryListTitle");

  // Get element category list
  var categoryList = $("#categoryList");

  // Set text
  categoryListTitle.text("Categories");

  // Clear category list
  categoryList.empty();

  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    method: "GET",
    success: function (response) {
      // Iterate each category
      $.each(response.categories, function (index, category) {
        // Create a category card element
        var categoryCard = $("<div>", {
          class: "relative bg-white rounded-lg overflow-hidden cursor-pointer",
        });

        // Create a category image element
        var categoryImage = $("<img>", {
          src: category.strCategoryThumb,
          alt: category.strCategory,
          class: "w-full h-32 object-cover",
        });

        // Create overlay within card
        var overlay = $("<div>", {
          class: "absolute inset-0 bg-black opacity-50",
        });

        // Create category name element
        var categoryName = $("<h3>", {
          text: category.strCategory,
          class:
            "absolute inset-0 flex items-center justify-center font-bold text-lg text-white",
        });

        // Append elements to card
        categoryCard.append(categoryImage);
        categoryCard.append(overlay);
        categoryCard.append(categoryName);
        categoryList.append(categoryCard);

        // Click event for category card
        categoryCard.click(function () {
          var categoryName = category.strCategory;
          window.location.href = "/mealList.html?category=" + categoryName;
        });
      });
    },
    // Handle error loading
    error: function () {
      categoryListTitle.text("Error loading categories");
    },
  });
});
