const express = require('express')
const path = require('path')
const connectDB = require('./db')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const weatherRoutes = require('./routes/weatherRoutes')
const paypalRoutes = require('./routes/paypalRoutes')

const {
  authenticateJWT,
  authorizeAdmin
} = require('./middlewares/authMiddleware')

const logHistory = require('./middlewares/historyMiddleware')

const app = express()
const PORT = 3000

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  session({
    secret: 'db',
    resave: false,
    saveUninitialized: true
  })
)

app.set('view engine', 'ejs')

connectDB()

app.use(logHistory)

// Routes
app.use('/admin', authenticateJWT, authorizeAdmin, adminRoutes) // Admin routes require authentication
app.use('/user', userRoutes)
app.use('/weather', weatherRoutes)
app.use('/paypal', paypalRoutes)

// Main Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'))
})

app.get('/login', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/login.html'))
})

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/cart.html'))
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
