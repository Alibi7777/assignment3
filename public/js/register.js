document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const showErrorDiv = document.getElementById("showErrorRegister");

  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    clearErrorMessages();

    const firstname = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // 🔹 Validate password length
    if (password.length < 6) {
      displayErrors(["Password must be at least 6 characters long."]);
      return; // Stop form submission
    }

    const user = { firstname, email, password };

    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        window.location.href = "login";
      } else {
        displayErrors([data.message]);
      }
    } catch (error) {
      console.error("Error:", error);
      displayErrors(["Server error. Please try again later."]);
    }
  });

  function displayErrors(errors) {
    showErrorDiv.innerHTML = ""; // Clear previous errors
    errors.forEach((error) => {
      const errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      errorElement.textContent = error;
      showErrorDiv.appendChild(errorElement); // Append each error message
    });
    showErrorDiv.style.color = "red"; // Style error messages
  }

  function clearErrorMessages() {
    showErrorDiv.innerHTML = ""; // Clear all errors
  }
});
