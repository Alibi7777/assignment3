const express = require('express')

const router = express.Router()

// Serve Weather Page
router.get('/weather', (req, res) => {
  res.render('weather', { weatherData: null, mapData: null, error: null })
})

// Fetch Weather Data
router.post('/weather', async (req, res) => {
  const { latitude, longitude } = req.body

  if (!latitude || !longitude) {
    return res.render('weather', {
      weatherData: null,
      mapData: null,
      error: 'Please provide valid latitude and longitude.'
    })
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    const response = await axios.get(url)
    ;``
    const weatherData = response.data

    const mapData = {
      lat: latitude,
      lon: longitude,
      city: weatherData.name
    }

    res.render('weather', { weatherData, mapData, error: null })
  } catch (error) {
    console.error('Error fetching weather data:', error.message)
    res.render('weather', {
      weatherData: null,
      mapData: null,
      error: 'Unable to fetch weather data. Please try again.'
    })
  }
})

module.exports = router
