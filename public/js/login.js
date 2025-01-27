document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const fullNameInput = document.getElementById("full-name"); // Add this to the login form if needed

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const userEmail = emailInput.value.trim();
    const userFullName = fullNameInput ? fullNameInput.value.trim() : "User"; // Default if not provided

    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userFullName", userFullName);
      // window.location.href = "profile.html"; // Redirect to profile page after login

console.log('========');

      window.location.href = "/";  // Redirect to home page

    }
  });
});
