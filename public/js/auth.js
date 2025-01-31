document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm')
  const loginButton = document.querySelector('.login-button')

  const token = localStorage.getItem('token')

  if (token) {
    fetchUserDetails(token)
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async event => {
      event.preventDefault()

      const email = document.getElementById('email-login').value
      const password = document.getElementById('password-login').value

      try {
        const response = await fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (response.ok) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data.username)
          window.location.href = '/'
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('Server error. Please try again.')
      }
    })
  }

  function openLoginPage () {
    window.location.href = 'login'
  }

  function logout () {
    localStorage.removeItem('token')
    alert('You have been logged out.')
    loginButton.textContent = 'Login'
    loginButton.removeEventListener('click', logout)
    loginButton.addEventListener('click', openLoginPage)
  }
})
