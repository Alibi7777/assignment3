document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const sunIcon = "pictures/sun-svgrepo-com.svg";
  const moonIcon = "pictures/moon-svgrepo-com.svg";

  // Check local storage for the current theme and set the icon accordingly
  if (localStorage.getItem("theme") === "dark-mode") {
    document.body.classList.add("dark-mode");
    themeIcon.src = moonIcon;
  } else {
    themeIcon.src = sunIcon;
  }

  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");

    // Toggle icon and save the theme in local storage
    if (isDarkMode) {
      themeIcon.src = moonIcon;
      localStorage.setItem("theme", "dark-mode");
    } else {
      themeIcon.src = sunIcon;
      localStorage.setItem("theme", "light-mode");
    }
  });
});
