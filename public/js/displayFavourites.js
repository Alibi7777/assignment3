document.addEventListener("DOMContentLoaded", () => {
  const favouritesContainer = document.querySelector(".favourites-list");
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.length === 0) {
    favouritesContainer.innerHTML = "<p>Your favourites list is empty.</p>";
    return;
  }

  favourites.forEach((item) => {
    const productHTML = `
      <div class="product-card">
        <div class="product-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="product-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <button class="add-to-cart-btn" data-product-id="${
            item.id
          }">Add to Cart</button>
          <button class="remove-favourite-btn" data-product-id="${
            item.id
          }">Remove from Favourites</button>
        </div>
      </div>
    `;
    favouritesContainer.insertAdjacentHTML("beforeend", productHTML);
  });

  // Remove from favourites functionality
  document.querySelectorAll(".remove-favourite-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      removeFromFavourites(productId);
    });
  });

  function removeFromFavourites(productId) {
    const updatedFavourites = favourites.filter(
      (item) => item.id !== productId
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    alert("Item removed from favourites.");
    window.location.reload(); // Reload to update the displayed list
  }
});
