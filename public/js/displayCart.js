document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".container");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  let total = 0;

  // Check if a user is logged in
  if (!currentUser) {
    cartContainer.innerHTML = "<p>Please log in to view your cart items.</p>";
    return;
  }

  // Filter items by the current user's email
  cartItems = cartItems.filter((item) => item.user_email === currentUser.email);

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItems.forEach((item, index) => {
    const productHTML = `
      <div class="cart-product" data-index="${index}">
        <div class="product-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="product-details">
          <h3>${item.name}</h3>
          <p>${item.description}</p>    
          <p>Price: $${item.price.toFixed(2)}</p>
          <img src="pictures/delete.svg" alt="Remove" class="delete-btn" data-index="${index}" />
        </div>
      </div>    
    `;
    cartContainer.insertAdjacentHTML("beforeend", productHTML);
    total += item.price;
  });

  const checkoutHTML = `
    <div class="checkout-section">
      <p>Total: $${total.toFixed(2)}</p>
      <button class="checkout-btn">Proceed to Checkout</button>
    </div>
  `;
  cartContainer.insertAdjacentHTML("beforeend", checkoutHTML);

  // Add event listeners for delete buttons
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      removeFromCart(index);
    });
  });

  // Add checkout button listener to clear the cart
  document.querySelector(".checkout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("cartItems");
    alert("Thank you for your purchase!");
    window.location.reload();
  });
});

function removeFromCart(index) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Filter items to match the current user's email
  cartItems = cartItems.filter((item) => item.user_email === currentUser.email);

  cartItems.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert("Item removed from the cart.");
  window.location.reload(); // Refresh the cart page
}

// document.addEventListener("DOMContentLoaded", () => {
//   const cartContainer = document.querySelector(".container");
//   let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//   let total = 0;
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   console.log(user);

//   if (cartItems.length === 0) {
//     cartContainer.innerHTML = "<p>Your cart is empty.</p>";
//     return;
//   }

//   cartItems.forEach((item, index) => {
//     const productHTML = `
//       <div class="cart-product" data-index="${index}">
//         <div class="product-image">
//           <img src="${item.image}" alt="${item.name}" />
//         </div>
//         <div class="product-details">
//           <h3>${item.name}</h3>
//           <p>${item.description}</p>
//           <p>Price: $${item.price.toFixed(2)}</p>
//           <button class="delete-btn" data-index="${index}">Remove</button>
//         </div>
//       </div>
//     `;
//     cartContainer.insertAdjacentHTML("beforeend", productHTML);
//     total += item.price;
//   });

//   const checkoutHTML = `
//     <div class="checkout-section">
//       <p>Total: $${total.toFixed(2)}</p>
//       <button class="checkout-btn">Proceed to Checkout</button>
//     </div>
//   `;
//   cartContainer.insertAdjacentHTML("beforeend", checkoutHTML);

//   // Add event listeners for delete buttons
//   document.querySelectorAll(".delete-btn").forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const index = event.target.getAttribute("data-index");
//       removeFromCart(index);
//     });
//   });

//   // Add checkout button listener to clear the cart
//   document.querySelector(".checkout-btn")?.addEventListener("click", () => {
//     localStorage.removeItem("cartItems");
//     alert("Thank you for your purchase!");
//     window.location.reload();
//   });
// });

// function removeFromCart(index) {
//   let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//   cartItems.splice(index, 1); // Remove the item at the specified index
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   alert("Item removed from the cart.");
//   window.location.reload(); // Refresh the cart page
// }
