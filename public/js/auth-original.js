document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm')
  const loginButton = document.querySelector('.login-button')

  const token = localStorage.getItem('jwtToken')

  if (token) {
    fetchUserDetails(token)
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async event => {
      event.preventDefault()

      const email = document.getElementById('email').value
      const password = document.getElementById('password').value

      try {
        const response = await fetch(
          'https://assignment3-gp8j.onrender.com/user/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          }
        )

        const data = await response.json()

        if (response.ok) {
          localStorage.setItem('jwtToken', data.token) // 🔹 Store JWT Token
          fetchUserDetails(data.token)
          alert(`Welcome, ${data.user.username}!`)
          window.location.href = '/'
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('Server error. Please try again.')
      }
    })
  }

  function openLoginPage () {
    window.location.href = 'login.html'
  }

  function logout () {
    localStorage.removeItem('jwtToken') // 🔹 Clear JWT Token
    alert('You have been logged out.')
    loginButton.textContent = 'Login'
    loginButton.removeEventListener('click', logout)
    loginButton.addEventListener('click', openLoginPage)
  }
})

// document.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.getElementById("loginForm");
//   let emailInput;
//   let passwordInput;
//   if (loginForm) {
//     emailInput = loginForm.querySelector("#email");
//     passwordInput = loginForm.querySelector("#password");
//   }

//   const loginButton = document.querySelector(".login-button");

//   // Check if a user is already logged in and update the header
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   if (currentUser) {
//     displayUserProfile(currentUser.name);
//   }

//   if (loginForm) {
//     loginForm.addEventListener("submit", (event) => {
//       event.preventDefault(); // Prevent the default form submission

//       const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//       console.log(storedUsers);
//       console.log(emailInput.value);
//       console.log(passwordInput.value);

//       const user = storedUsers.find(
//         (u) =>
//           u.email === emailInput.value && u.password === passwordInput.value
//       );

//       // /login {username, password}

//       if (user) {
//         // Save the logged-in user to local storage
//         localStorage.setItem("currentUser", JSON.stringify(user));
//         displayUserProfile(user.name);
//         alert(`Welcome back, ${user.name}!`);

//   console.log('========');
//         window.location.href = "https://assignment3-gp8j.onrender.com/"; // Redirect to home
//       } else {
//         alert("Invalid email or password. Please try again.");
//       }
//     });
//   }

//   function displayUserProfile(userName) {
//     if (loginButton) {
//       loginButton.textContent = userName;
//       loginButton.style.cursor = "pointer";
//       loginButton.removeEventListener("click", openLoginPage); // Remove previous login event
//       loginButton.addEventListener("click", logout); // Add logout functionality
//     }
//   }

//   function openLoginPage() {
//     window.location.href = "login.html";
//   }

//   function logout() {
//     localStorage.removeItem("currentUser"); // Remove current user data
//     alert("You have been logged out.");
//     loginButton.textContent = "Login"; // Reset to "Login" text
//     loginButton.removeEventListener("click", logout); // Remove logout event
//     loginButton.addEventListener("click", openLoginPage); // Re-add login event
//   }
// });
