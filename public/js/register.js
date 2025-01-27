document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const showErrorDiv = document.getElementById("showErrorRegister");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    clearErrorMessages();

    let isValid = true;
    let errorMessages = [];

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (nameInput.value.trim() === "") {
      errorMessages.push("Full Name is required.");
      isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
      errorMessages.push("Please enter a valid email address.");
      isValid = false;
    } else {
      const emailExists = users.some(
        (user) => user.email === emailInput.value.trim()
      );
      if (emailExists) {
        errorMessages.push("This email is already registered.");
        isValid = false;
      }
    }

    if (passwordInput.value.length < 8) {
      errorMessages.push("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      errorMessages.push("Passwords do not match.");
      isValid = false;
    }

    if (isValid) {
      const user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
      };

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(user)); // Set current user

      alert("Registration successful!");
      window.location.href = "http://localhost:3000/";  // Redirect to home page
    } else {
      displayErrors(errorMessages);
    }
  });

  function displayErrors(errors) {
    showErrorDiv.innerHTML = ""; // Clear previous errors
    errors.forEach((error) => {
      const errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      errorElement.textContent = error;
      showErrorDiv.appendChild(errorElement); // Append each error message as a child
    });
    showErrorDiv.style.color = "red"; // Optional: style the error text
  }

  function clearErrorMessages() {
    showErrorDiv.innerHTML = ""; // Clear all errors
  }

  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }
});
