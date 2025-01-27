document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      addToCart(productId);
    });
  });

  const products = [
    {
      id: "1",
      name: "Combo Deal - Save $125.00",
      price: 427.97,
      image: "pictures/combo-deal.png",
      category: "phone",
      description:
        "Intel Core i7 + Corsair Vengeance RAM + ASUS ROG Strix Z690",
    },
    {
      id: "2",
      name: "Desktop Computers - Save $30.00",
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

  localStorage.setItem("products", JSON.stringify(products));

  function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const product = products.find((p) => p.id === productId);

    if (product) {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      product.user_email = user.email;
      cartItems.push(product);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert(`${product.name} has been added to the cart.`);
    } else {
      console.error("Product not found!");
    }
  }
});
function removeFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert("Item removed from the cart.");
  window.location.reload(); // Refresh the cart page
}
