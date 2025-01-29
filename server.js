const express = require('express')
const axios = require('axios')
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('./db')
const session = require('express-session')
const adminRoutes = require('./routes/admin')

const paypal = require('./routes/paypal')

const app = express()
const PORT = 3000
const apiKey = '1da12cdfab6dfbdb58e30233c938cf87' // OpenWeather API key
const PRODUCT_REVIEW_API = 'https://fakestoreapi.com/products' // API для получения товаров и отзывов

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(adminRoutes)
app.use(
  session({
    secret: 'db',
    resave: false,
    saveUninitialized: true
  })
)

app.set('view engine', 'ejs')

connectDB()

//main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'))
})

// Serve Weather Page
app.get('/weather', (req, res) => {
  res.render('weather', { weatherData: null, mapData: null, error: null })
})

// Fetch Weather Data
app.post('/weather', async (req, res) => {
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

// Fetch Products Data
app.get('/products', async (req, res) => {
  try {
    const url =
      'https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products'
    const response = await axios.get(url)
    const products = response.data

    // Send the product data as JSON
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error.message)
    res
      .status(500)
      .json({ error: 'Unable to fetch products. Please try again later.' })
  }
})

app.get('/contact', async (req, res) => {
  try {
    const response = await axios.get('https://favqs.com/api/qotd')
    const quote = response.data

    res.render('contact', { quote })
  } catch (error) {
    console.error('Error fetching quote:', error.message)
    res.render('contact', { quote: null })
  }
})
app.get('/login', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/login.html'))
})

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/cart.html'))
})

app.get('/get-reviews', async (req, res) => {
  try {
    const { productId } = req.query

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' })
    }

    const url = `${PRODUCT_REVIEW_API}/${productId}`
    const response = await axios.get(url)
    const productData = response.data

    res.json({
      title: productData.title,
      price: productData.price,
      description: productData.description,
      rating: productData.rating ? productData.rating.rate : 'No rating',
      reviewCount: productData.rating
        ? productData.rating.count
        : 'No reviews available'
    })
  } catch (error) {
    console.error(
      `Review API Error for product ${req.query.productId}:`,
      error.message
    )
    res.status(500).json({ error: 'Error fetching reviews' })
  }
})

// === Страница истории данных ===
app.get('/history', async (req, res) => {
  try {
    const currencyHistory = await CurrencyHistory.find().sort({ timestamp: -1 })
    const reviewHistory = await ReviewHistory.find().sort({ timestamp: -1 })

    res.render('history', { currencyHistory, reviewHistory })
  } catch (error) {
    res.render('history', { history: [], error: 'Error fetching history' })
  }
})

app.get('/get-reviews', async (req, res) => {
  try {
    const { productId } = req.query

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' })
    }

    const url = `${PRODUCT_REVIEW_API}/${productId}`
    const response = await axios.get(url)
    const productData = response.data

    res.json({
      title: productData.title,
      price: productData.price,
      description: productData.description,
      rating: productData.rating.rate,
      reviewCount: productData.rating.count
    })
  } catch (error) {
    console.error('Review API Error:', error.message)
    res.status(500).json({ error: 'Error fetching reviews' })
  }
})

app.post('/pay', async (req, res) => {
  try {
    const { cartItems } = req.body
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    const approval_url = await paypal.createOrder(cartItems)
    res.json({ approval_url })
  } catch (error) {
    console.error('PayPal Payment Error:', error)
    res.status(500).json({ error: 'Payment failed' })
  }
})

app.get('/complete-order', async (req, res) => {
  try {
    await paypal.capturePayment(req.query.token)

    //1. need to add for db. new collection which called orders (there are succefull orders)
    //2. and this orders are referenced for user id

    //3. create history page for user. to check items
    //4. create /admin-items for admin. here it checks the role of user.
    //5. in /admin-items will table with orders. And admin can refund item
    //6. create /admin-users for admin. it has edit/delete user.

    res.send('Order completed successfully!')
  } catch (error) {
    console.error('Error capturing payment:', error)
    res.send('Error processing payment')
  }
})

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
