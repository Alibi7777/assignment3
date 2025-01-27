document.addEventListener("DOMContentLoaded", function () {
  const openPopupButton = document.getElementById("open-popup");
  const closePopupButton = document.getElementById("close-popup");
  const popup = document.getElementById("contact-popup");

  // Open popup when 'Contact Us' is clicked
  openPopupButton.addEventListener("click", function (event) {
    event.preventDefault();
    popup.style.display = "flex";
  });

  // Close popup when the close button is clicked
  closePopupButton.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // Close popup when clicking outside the popup content
  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});
