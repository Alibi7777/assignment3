document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("color-button");
  const body = document.body;

  // Predefined set of colors to cycle through
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F3FF33",
    "#FF33F3",
    "#f0f0f5",
  ];
  let currentIndex = 0;

  button.addEventListener("click", function () {
    // Cycle through predefined colors
    body.style.backgroundColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length; // Loop through the colors
  });
});
