document.addEventListener('DOMContentLoaded', () => {
  const feedbackDiv = document.getElementById('feedback')
  const mainButton = document.getElementById('main_button')
  const resetButton = document.getElementById('reset_button')

  // Fetch and display a random quote
  async function fetchQuote () {
    try {
      const response = await fetch('/api/quote') // Fetch from the server endpoint
      if (!response.ok) throw new Error('Failed to fetch quote.')
      const data = await response.json()

      // Display the quote
      feedbackDiv.innerHTML = `
        <blockquote>
          <p>"${data.content}"</p>
          <footer>- ${data.author}</footer>
        </blockquote>
      `
    } catch (error) {
      console.error('Error fetching quote:', error.message)
      feedbackDiv.innerHTML =
        "<p style='color: red;'>Unable to load a quote. Please try again later.</p>"
    }
  }

  // Handle form submission
  mainButton.addEventListener('click', event => {
    event.preventDefault()
    feedbackDiv.innerHTML =
      "<p style='color: green;'>Thank you for your message! We will get back to you soon.</p>"
  })

  // Handle reset button
  resetButton.addEventListener('click', event => {
    event.preventDefault()
    document.getElementById('contact-form').reset()
    feedbackDiv.innerHTML = '' // Clear feedback
  })

  // Fetch a quote when the page loads
  fetchQuote()
})
