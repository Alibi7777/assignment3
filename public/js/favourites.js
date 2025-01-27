document.addEventListener("DOMContentLoaded", () => {
  const addToFavouritesButtons = document.querySelectorAll(
    ".add-to-favourites-btn"
  );

  addToFavouritesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      addToFavourites(productId);
    });
  });

  const products = [
    {
      id: "1",
      name: "Combo Deal",
      price: 427.97,
      image: "pictures/combo-deal.png",
      description:
        "Intel Core i7 + Corsair Vengeance RAM + ASUS ROG Strix Z690",
    },
    {
      id: "2",
      name: "Desktop Computers",
      price: 2489.97,
      image: "pictures/desktop-computer-image.png",
      description: "ABS Gaming PC + Acer Monitor + Razer Headset",
    },
    {
      id: "3",
      name: "Google Pixel 9",
      price: 579,
      image: "pictures/phone1.png",
      description: "Google Pixel 9 - Save $400",
    },
  ];

  function addToFavourites(productId) {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const product = products.find((p) => p.id === productId);

    if (product) {
      // Check if the item is already in favourites to avoid duplicates
      const alreadyInFavourites = favourites.some(
        (fav) => fav.id === productId
      );
      if (!alreadyInFavourites) {
        favourites.push(product);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        alert(`${product.name} has been added to favourites.`);
      } else {
        alert(`${product.name} is already in favourites.`);
      }
    } else {
      console.error("Product not found!");
    }
  }
});
