document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");

  function handleMenuToggle() {
    if (window.innerWidth <= 428) {
      navMenu.classList.toggle("active");
    }
  }

  if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener("click", handleMenuToggle);
  } else {
    console.error("Elements with IDs 'hamburger-menu' or 'nav-menu' not found");
  }

  // Ensure menu is hidden when resizing from a small screen to a larger screen
  window.addEventListener("resize", () => {
    if (window.innerWidth > 428) {
      navMenu.classList.remove("active");
    }
  });
});
